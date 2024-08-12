
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import React, { useCallback, useContext, useRef, useState } from 'react';
import { View, FlatList, Dimensions, Modal, TouchableOpacity, StyleSheet, Animated, Text, Share } from 'react-native';
import Video from 'react-native-video';
import { AuthContext } from '../../component/auth/AuthContext';
import { deletePost, requestCommentlist, requestFollowUser, requestGetDetails, requestPostList, requestPotlikeunlike, requestReport } from '../../services/api_Services';
import { ActivityIndicator } from 'react-native-paper';
import { COLORS } from '../../style';
import Skeleton from '../../component/Skeleton/Skeleton';
import { styles } from './styles';
import { AngryIcon, AngryOutlinIcon, CommentIcon, CommentInactiveIcon, CrossRedIcon, HahaIcon, HahaOutlinIcon, LikeIcon, LikeOutlineIcon, LikeOutlineWhiteIcon, LoveIcon, LoveOutlinIcon, SadIcon, SadOutlinIcon, ShareInactiveIcon, ThreeDotInfo, WowIcon, WowOutlinIcon } from '../../assets/svgImg/SvgImg';
import FastImage from 'react-native-fast-image';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import ActionView from './PostScreen/ActionView';
import BlockView from './PostScreen/BlockView';
import ReportView from './PostScreen/ReportView';
import DeletePostView from './PostScreen/DeletePostView';
import { strings } from '../../utils/strings';
import CommentView from './PostScreen/CommentView';
import emitter from '../../component/Emitter/emitter';
import ImgView from '../../component/ImgView/ImgView';
import AppText from '../../component/AppText/AppText';
import ShowMore from './ShowMore';
import Reactions from '../../component/EmojisAnimation/EmojisAnimation';
import dynamicLinks from '@react-native-firebase/dynamic-links';

const { height: windowHeight } = Dimensions.get('window');
const VideoItem = React.memo(({ item,index, isPlaying, navigation, GetUserDetails, setScreenDat, setUserId, actionSheetRef, renderTagUsers, handleImagePress, getUniqueEmojis, renderLikeItem, handleCommentPress, onImoji, PostLikeapi, GetCommentList,actionSheetRefComment, commentInputRef, shareMessage, showReactions, handleReactionSelect }: any) => {
  // const VideoItem = ({ item, isPlaying }) => {
  const uniqueLikes = getUniqueEmojis(item.lastThreeLikes);
  const focus = useIsFocused()
  
  return (
    <View style={styles.postView}>
      <View style={styles.everyPostView}>
        <View style={[styles.userDetails, { width: '90%', alignSelf: 'center' }]}>
          <TouchableOpacity activeOpacity={1}
            style={[styles.userDetails, {}]}
          >
            <TouchableOpacity onPress={() => {
              navigation.navigate('Profile', {
                id: item?.user?.id,
              });
              // setScreenDat(0);
            }}>
              <ImgView
                height={40}
                width={40}
                radius={50}
                dummy={true}
                url={
                  item?.user?.profile_picture
                    ? { uri: item?.user?.profile_picture }
                    : require('../../assets/img/profilepic.jpg')
                }
              />
            </TouchableOpacity >
            <View style={[styles.nameUserName, { paddingLeft: 12, paddingRight: 0 }]}>
              <AppText
                size={16}
                family="PoppinsSemiB"
                color="white"
                numLines={1}
                dotMode="tail">
                {item?.user?.user_name ? item?.user?.user_name : item?.user?.full_name}
              </AppText>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center', width: '99%', justifyContent: 'space-between'
              }}>
                {/* {item?.location != '' && */}
                <AppText
                  size={13}
                  family="PoppinsRegular"
                  color={COLORS.mediumgray}
                  numLines={1}
                  dotMode="tail"
                  width={'60%'}
                  maxWidth={'60%'}>
                  {item?.location != '' ? item?.location : null}
                </AppText>
                {/* } */}
                <AppText
                  size={13}
                  family="PoppinsRegular"
                  color={COLORS.mediumgray}
                >
                  {item?.postCreationTime}
                </AppText>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.infoIcon}
            onPress={() => {
              setTimeout(() => {
                GetUserDetails(item?.user?.id);
              }, 100);
              setScreenDat(0);
              setUserId(item);
              actionSheetRef.current?.show();
            }}>
            <ThreeDotInfo />
          </TouchableOpacity>

        </View>
        <View style={{ width: '100%', alignSelf: 'center' }}>
          {item?.description ?
            ((item?.color.length > 0 && item?.color[0] !== '#111111' && item?.color[0] !== '') ? (
              <>
                {renderTagUsers(item)}
                <View
                  style={[styles.TextBackgroundBox, {
                    backgroundColor:
                      item.color.length > 0 ? item.color[0] : COLORS.black131,
                  }]}>
                  <AppText
                    size={27}
                    family="PoppinsSemiB"
                    color={
                      item.color[0] !== '#FFFFFF' ? COLORS.white : COLORS.black
                    }>
                    {item?.description}
                  </AppText>
                </View>
              </>
            )
              :
              <>
                {item?.files[0]?.url &&
                  <View style={{ width: '90%', alignSelf: 'center' }}>
                    <ShowMore description={item?.description} />
                  </View>
                }
                {renderTagUsers(item)}
              </>
            )
            :
            <>
              {renderTagUsers(item)}
            </>
          }
        </View>
        {item?.files.length > 0 &&
          (item?.files[0]?.type == 'video' ? (
            <>

              <TouchableOpacity
                onPress={() => { }}
                style={{ marginBottom: 12, marginTop: 15,  backgroundColor: 'black' }}
                activeOpacity={0.9}>


                <Video
                  source={{ uri: item.files[0]?.url }}
                  style={{ width: '100%',maxHeight: windowHeight-300,height: windowHeight/1.7, flex: 1 }}
                  resizeMode="contain"
                  paused={!focus ? true :  !isPlaying} // Control playback with this prop
                  repeat // Loop the video
                />



              </TouchableOpacity>
            </>

          ) : (
            <TouchableOpacity
              onPress={() => handleImagePress(item?.files[0]?.url)}
              style={{ marginBottom: 12, marginTop: 15 }}
              activeOpacity={0.9}>
              <ImgView
                height={400}
                width={'100%'}
                url={item?.files[0]?.url}
                mode="contain"
             
              />
            </TouchableOpacity>
          ))
        }
        <View style={[styles.photoStatus, { marginTop: (item?.likeCount > 0 || item?.commentCount > 0) ? 10 : 0 }]}>
          <View style={styles.emojiContainer}>
           

            {item?.likeCount > 0 && uniqueLikes.length > 0 &&
              (item?.lastThreeLikes.length > 0 && (
                <View style={{}}>
                  <FlatList
                    data={uniqueLikes}
                    renderItem={renderLikeItem}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                  />
                </View>
              ))
            }

            {item?.commentCount > 0 && <CommentIcon />}
          </View>
          
          <View
            style={{
              marginHorizontal: 12,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <AppText
              numLines={1}
              dotMode="tail"
              size={13}
              color={COLORS.grey90}
              family={'PoppinsRegular'}>
              {item?.likeCount > 0
                ? `${item?.likeCount} ${item?.likeCount === 1 ? 'Like' : 'Likes'
                }`
                : null}{' '}
            </AppText>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => handleCommentPress(item)}>
              <AppText
                numLines={1}
                dotMode="tail"
                size={13}
                color={COLORS.grey90}
                family={'PoppinsRegular'}>
                {item?.commentCount > 0 ? (
                  <>
                    <Text style={styles.smallBullet}>
                      {item?.likeCount > 0 ? '\u2022' : ''}
                    </Text>{' '}
                    {`${item?.commentCount} ${item?.commentCount === 1 ? 'Comment' : 'Comments'
                      }`}
                  </>
                ) : null}
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.photoStatus, styles.likecommentShare, { marginTop: (item?.likeCount > 0 || item?.commentCount > 0) ? 15 : 0 }]}>
          {item?.isLikedByUser === false || item?.isLikedByUser === null ? (
            <TouchableOpacity activeOpacity={0.8} onLongPress={() => onImoji(item, index)}
              onPress={() => {
                PostLikeapi(item?._id, true, 'like');
              }}>
              <LikeOutlineIcon />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity activeOpacity={0.8}
              onPress={() => {
                PostLikeapi(item?._id, false, 'like');
              }}>
              
              {item?.userLikeEmoji == 1 ?
                <LikeIcon />
                :
                item?.userLikeEmoji == 2 ?
                  <WowIcon />
                  :
                  item?.userLikeEmoji == 3 ?
                    <HahaIcon />
                    :
                    item?.userLikeEmoji == 4 ?
                      <SadIcon />
                      :
                      item?.userLikeEmoji == 5 ?
                        <AngryIcon />
                        :
                        item?.userLikeEmoji == 6 ?
                          <LoveIcon />
                          : null
              }

             
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => {
              GetCommentList(item?._id);
              setUserId(item);
              actionSheetRefComment?.current?.show();
              commentInputRef?.current?.focus();
            }}>
            <CommentInactiveIcon />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => shareMessage(item)}>
            <ShareInactiveIcon />
          </TouchableOpacity>
        </View>
        {(item?.imojiStatus && showReactions) && (
          <Reactions onReactionSelect={handleReactionSelect} />
        )}
      </View>
    </View>
  );
});

const AutoPlayVideoFeed = ({ dataMap, route, handleBlankCore, handleLoadMore, loading, refreshing, handleRefresh, navigation, GetUserDetails, actionSheetRef, setUserId, setScreenDat, renderTagUsers, handleImagePress, getUniqueEmojis, handleCommentPress, onImoji, PostLikeapi, GetCommentList, actionSheetRefComment, commentInputRef, shareMessage, showReactions, handleReactionSelect}: any) => {
  const [cardData] = useState(new Array(3).fill(0));
  const [currentIndex, setCurrentIndex] = useState(null);
  const onViewRef = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });


  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });
  const getReactionIcon = (emoji: any) => {
    switch (emoji) {
      case 1:
        return <LikeOutlineWhiteIcon />;
      case 2:
        return <WowOutlinIcon />;
      case 3:
        return <HahaOutlinIcon />;
      case 4:
        return <SadOutlinIcon />;
      case 5:
        return <AngryOutlinIcon />;
      case 6:
        return <LoveOutlinIcon />;
      default:
        return null;
    }
  };

  // Helper function to render each like item
  const renderLikeItem = ({ item, index }: { item: any, index: any }) => {
    return (
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        left: index == 1 ? -7 : index == 2 ? -16 : 0
      }}>
        {getReactionIcon(item.emoji)}
      </View>
    );
  };
  return (
    <FlatList
      data={dataMap}
      // style={}
      renderItem={({ item, index }) => (
        <VideoItem
          item={item}
          index={index}
          isPlaying={currentIndex === index}
          navigation={navigation}
          GetUserDetails={GetUserDetails}
          actionSheetRef={actionSheetRef}
          setUserId={setUserId}
          setScreenDat={setScreenDat}
          renderTagUsers={renderTagUsers}
          handleImagePress={handleImagePress}
          getUniqueEmojis={getUniqueEmojis}
          renderLikeItem={renderLikeItem}
          handleCommentPress={handleCommentPress}
          onImoji={onImoji}
          PostLikeapi={PostLikeapi}
          GetCommentList={GetCommentList}
          actionSheetRefComment={actionSheetRefComment}
          commentInputRef={commentInputRef}
          shareMessage={shareMessage}
          showReactions={showReactions}
          handleReactionSelect={handleReactionSelect} />
      )}
      keyExtractor={(item, index) => index.toString()}
      onEndReached={
        route?.params?.postId ? handleBlankCore : handleLoadMore
      }
      // pagingEnabled // Snap to each video
      onViewableItemsChanged={onViewRef.current}
      viewabilityConfig={viewConfigRef.current}
      refreshing={refreshing}
      onRefresh={handleRefresh}
      ListEmptyComponent={() => (
        <View style={{ flex: 1 }}>
          {cardData.map((_, index) => (
            <View
              key={index}
              style={{ marginVertical: 15, marginHorizontal: 20 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Skeleton
                  type="circle"
                  height={50}
                  width={50}
                  borderRadius={50}
                />
                <View style={styles.nameUserName}>
                  <Skeleton type="box" height={25} width={130} />
                </View>
                <Skeleton
                  type="circle"
                  height={8}
                  width={8}
                  borderRadius={50}
                />
                <Skeleton
                  type="circle"
                  height={8}
                  width={8}
                  borderRadius={50}
                />
                <Skeleton
                  type="circle"
                  height={8}
                  width={8}
                  borderRadius={50}
                />
              </View>
              <Skeleton
                type="box"
                height={250}
                width={'100%'}
                style={{ marginTop: 20 }}
              />
            </View>
          ))}
        </View>
      )}

      ListFooterComponent={
        loading ? (
          <View style={{ marginTop: 80 }}>
            <ActivityIndicator size={50} color={COLORS.white} />
          </View>
        ) : null
      }
    />
  );
};

// Example usage:


const PostView = ({ navigation, route, setScreenDat, screenDat }: any) => {
  const [page, setPage] = useState(1);
  const { userToken, userDetails }: any = useContext(AuthContext);
  const [skeletonLoader, setSkeletonLoader] = useState(false);
  const [postlistData, setPostlistData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [active, setActive] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [status, setStatus] = useState<boolean>(false);
  const [screenData, setScreenData] = useState<any>(0);
  const [userId, setUserId] = useState<any>();
  const [commentData, setCommentData] = useState<any>();
  const [itemData, setItemData] = useState<any>();
  const [showReactions, setShowReactions] = useState<boolean>(false);
  const [reaction, setReaction] = useState<string | null>(null);

  const animation = useRef(new Animated.Value(0)).current;
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const actionSheetRefComment = useRef<ActionSheetRef>(null);
  const commentInputRef = useRef<any>(null);

  useFocusEffect(
    useCallback(() => {
      GetPostList(page);
    }, []),
  );

  const GetPostList = async (page: any) => {
    let apiData;
    if (route?.params?.postId) {
      apiData = {
        login_user_id: userDetails?.id,
        token: userToken,
        page: page,
        id: route?.params?.postId,
      };
    } else {
      apiData = {
        login_user_id: userDetails?.id,
        token: userToken,
        page: page,
      };
    }
    setSkeletonLoader(true);
    try {
      const res = await requestPostList(apiData);

      if (res && Array.isArray(res.posts)) {
        let result = res.posts;
        if (page === 1) {
          setPostlistData(result);
        } else {
          if (!route?.params?.postId) {
            setTimeout(() => {
              setPostlistData((prevData: any) => [...prevData, ...result]);
            }, 2000);
          }
        }
      } else {
        console.log('Invalid response structure:', res);
      }

      setLoading(false);
    } catch (error) {
      console.log('PostList response error: ', error);
    } finally {
      setSkeletonLoader(false);
      setLoading(false);
    }
  };
  const handleBlankCore = () => { };
  const handleLoadMore = () => {
    setLoading(true);
    if (!loading) {
      let dpage = page + 1;
      setPage(prevPage => prevPage + 1);
      GetPostList(dpage);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
    GetPostList(1);
    setRefreshing(false);
  };

  const handleImagePress = (data: any) => {
    setActive(data);
    setModalVisible(true);
    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  const handleImageClose = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
    });
  };

  const animatedStyle = {
    opacity: animation,
    transform: [{ scale: animation }],
  };

  const UserFollowApi = async (status: any) => {
    const data: any = {
      follower_id: userDetails?.id,
      token: userToken,
      following_id: userId?.user?.id,
      action: status,
    };
    try {
      const res = await requestFollowUser(data);
      const datas = { heading: 'login', message: res?.message };
      emitter.emit('alert', datas);
      actionSheetRef.current?.hide();
      if (status == 'block') {
        GetPostList(1);
      }
    } catch (error) {
      console.log('Follow user response: ', error);
    }
  };

  const ReportApi = async (report_text: any) => {
    const data: any = {
      user_id: userDetails?.id,
      token: userToken,
      post_id: userId?._id,
      report_text: report_text,
    };
    try {
      const res = await requestReport(data);
      const datas = { heading: 'login', message: res?.message };
      emitter.emit('alert', datas);
      actionSheetRef.current?.hide();
      GetPostList(1);
    } catch (error) {
      console.log('Follow user response: ', error);
    }
  };

  const DeletePostApi = async () => {
    
    GetPostList(1);
    const data: any = {
      token: userToken,
      post_id: userId?._id
    };
    try {
      const res = await deletePost(data);
      const datas = { heading: 'login', message: res?.message };
      emitter.emit('alert', datas);
      actionSheetRef.current?.hide();
      GetPostList(1);
      setPostlistData((prevPosts: any) => prevPosts.filter((post: any) => post._id !== userId?._id));
    } catch (error) {
      console.log('Delete Post response: ', error);
      actionSheetRef.current?.hide();
      GetPostList(1);
    }
    if (route?.params?.postId) {
      navigation.goBack()
    }
  };

  const CancelDeletePost = () => {
    actionSheetRef.current?.hide();
    GetPostList(1);
  }

  
  const GetUserDetails = async (userId: any) => {
    const apiData = {
      user_id: userId,
      token: userToken,
      loginUserId: userDetails?.id,
    };
    try {
      await requestGetDetails(apiData).then(async (res: any) => {
        setStatus(res?.is_following);
      });
    } catch (error) {
      console.log('PostList response: ', error);
    }
  };

  const renderTagUsers = (item: any) => {
    if (item?.tags?.length > 0) {
      return (
        <View style={styles.mentionContainer}>
          {item.tags.map((user: any, index: any) => (
            <TouchableOpacity key={index} activeOpacity={0.6} onPress={() => {
              navigation.navigate('Profile', {
                id: user?.id,
              })
            }}>
              <Text style={styles.mention}>{`@${user.user_name} `}</Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    }
    return null;
  };

  const getUniqueEmojis = (likes: any) => {
    const seen = new Set();
    return likes.filter((like: any) => {
      if (seen.has(like.emoji)) {
        return false;
      }
      seen.add(like.emoji);
      return true;
    });
  };

  const handleCommentPress = (item: any) => {
    GetCommentList(item?._id);
    setUserId(item);
    actionSheetRefComment?.current?.show();
    commentInputRef?.current?.focus();
  };

  const onImoji = (item: any, index: any) => {
    setItemData(item)
    const updatedUsers = postlistData.map((item: any, selectedIndex: any) => ({
      ...item,
      imojiStatus: selectedIndex === index ? !item.imojiStatus : false
    }));
    setPostlistData(updatedUsers)
    setShowReactions(true);
  };

  const PostLikeapi = async (postID: any, status: any, like: any) => {
    const updatedUsers = postlistData.map((user: any) => ({
      ...user,
      imojiStatus: false,
    }));
    setPostlistData(updatedUsers);
    setShowReactions(false);
    const data = {
      user: userDetails?.id,
      emoji: like == "like" ? 1 : like == 'wow' ? 2 : like == 'haha' ? 3 : like == 'sad' ? 4 : like == 'angry' ? 5 : like == 'love' ? 6 : "like",
    };
    try {
      await requestPotlikeunlike(data, postID, userToken).then(res => {
        const updatedPostlistData = postlistData.map((post: any) => {
          if (post._id == postID) {
            let updatedLikes = [...post?.lastThreeLikes];
            
            
            if (status) {
              const newLike = {
                name: userDetails?.full_name,
                emoji: like == "like" ? 1 : like == 'wow' ? 2 : like == 'haha' ? 3 : like == 'sad' ? 4 : like == 'angry' ? 5 : like == 'love' ? 6 : "like",
              };
              const existingLikeIndex = updatedLikes.findIndex(like => like?.name === userDetails?.full_name)
              if (existingLikeIndex !== -1) {
                updatedLikes[existingLikeIndex] = newLike;
              } else {
                updatedLikes = [newLike, ...updatedLikes].slice(0, 3);
              }
            } else {
              updatedLikes = updatedLikes.filter(like => like?.name !== userDetails?.full_name);
            }
            return {
              ...post,
              isLikedByUser: status,
              likeCount: status ? post?.likeCount + 1 : post?.likeCount - 1,
              userLikeEmoji: like == "like" ? 1 : like == 'wow' ? 2 : like == 'haha' ? 3 : like == 'sad' ? 4 : like == 'angry' ? 5 : like == 'love' ? 6 : "like",
              lastThreeLikes: updatedLikes,
            };
          }
          return post;
        });
        setPostlistData(updatedPostlistData);
      });
    } catch (error) {
      console.log('Create group response: ', error);
    }
  };

  const GetCommentList = async (postId: any) => {
    const apiData = {
      postId: postId,
      token: userToken,
    };
    try {
      await requestCommentlist(apiData).then(async (res: any) => {
        
        setCommentData(res);
      });
    } catch (error) {
      console.log('PostList response: ', error);
    }
  };
  

  const shareMessage = async (item: any) => {
    const getLink: any = await generateLink(item?._id);
    
    try {
      const result = await Share.share({
        message: getLink,
        // You can also specify a URL or title here if needed
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Shared with activity type of result.activityType
          console.log('Shared with activity type:', result.activityType);
        } else {
          // Shared successfully
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        // Dismissed
        console.log('Share dismissed');
      }
    } catch (error: any) {
      console.error('Error sharing:', error.message);
    }
  };

  const generateLink = async (postId: any) => {
    try {
      const link = await dynamicLinks().buildShortLink(
        {
          link: `https://mytraclub.page.link/r394?postId=${postId}`,
          domainUriPrefix: 'https://mytraclub.page.link',
          android: {
            packageName: 'com.thebikerscompany',
          },
          ios: {
            appStoreId: '6526488238',
            bundleId: 'com.mytra',
          },
        },
        dynamicLinks.ShortLinkType.DEFAULT,
      );
      console.log('link:', link);
      return link;
    } catch (error) {
      console.log('Generating Link Error:', error);
    }
  };

  const handleReactionSelect = (reactionName: string) => {
    
    setReaction(reactionName);
    setShowReactions(false);
    const updatedUsers = postlistData.map((user: any) => ({
      ...user,
      imojiStatus: false,
    }));
    setPostlistData(updatedUsers);

    PostLikeapi(itemData?._id, true, reactionName);
  };


  return (
    <View style={{ flex: 1, backgroundColor: COLORS.black }}>
      <AutoPlayVideoFeed
        dataMap={postlistData}
        route={route}
        handleBlankCore={handleBlankCore}
        handleLoadMore={handleLoadMore}
        loading={loading}
        refreshing={refreshing}
        handleRefresh={handleRefresh}
        navigation={navigation}
        GetUserDetails={GetUserDetails}
        setScreenDat={setScreenDat}
        setUserId={setUserId}
        actionSheetRef={actionSheetRef}
        renderTagUsers={renderTagUsers}
        handleImagePress={handleImagePress}
        getUniqueEmojis={getUniqueEmojis}
        handleCommentPress={handleCommentPress}
        onImoji={onImoji}
        PostLikeapi={PostLikeapi}
        GetCommentList={GetCommentList}
        actionSheetRefComment={actionSheetRefComment}
        commentInputRef={commentInputRef}
        shareMessage={shareMessage}
        showReactions={showReactions}
        handleReactionSelect={handleReactionSelect} />
      {active && (
        <Modal transparent visible={modalVisible}>
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            onPress={handleImageClose}>
            <Animated.View style={[styles.overlayBG, animatedStyle]} />
          </TouchableOpacity>
          <Animated.View style={[styles.modalContent, animatedStyle]}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleImageClose}>
              <CrossRedIcon />
            </TouchableOpacity>
            <FastImage
              source={{ uri: active }}
              style={styles.img}
              resizeMode={FastImage.resizeMode.contain}
            />
          </Animated.View>
        </Modal>
      )}
      <ActionSheet
        ref={actionSheetRef}
        headerAlwaysVisible={true}
        onClose={() => {
          actionSheetRef.current?.hide();
          setScreenData(0);
        }}
        indicatorStyle={styles.indicator}
        containerStyle={
          screenData == 2 ? styles.actionContainer2 : styles.actionContainer
        }>
        {screenData == 0 ? (
          <ActionView
            actionSheetRef={actionSheetRef}
            status={status}
            UserFollowApi={UserFollowApi}
            navigation={navigation}
            userId={userId}
            userDetails={userDetails}
            setScreenData={setScreenData}
          />
        ) : screenData == 1 ? (
          <BlockView
            actionSheetRef={actionSheetRef}
            UserFollowApi={UserFollowApi}
            userId={userId}
            setScreenData={setScreenData}
          />
        ) : screenData == 2 ? (
          <ReportView ReportApi={ReportApi} />
        ) : screenData == 3 ? (
          <DeletePostView
            actionSheetRef={actionSheetRef}
            UserFollowApi={DeletePostApi}
            userId={userId}
            setScreenData={CancelDeletePost}
          />
        ) : screenData == 4 ? (
          navigation.navigate(strings.UPDATE_POST, { "item": userId })
        )
          : null}
      </ActionSheet>
      <ActionSheet
        ref={actionSheetRefComment}
        headerAlwaysVisible={true}
        animated={true}
        indicatorStyle={styles.indicator}
        containerStyle={styles.actionContainer2}>
        <CommentView
          userId={userId}
          commentData={commentData}
          GetCommentList={GetCommentList}
          commentInputRef={commentInputRef}
        />
      </ActionSheet>
    </View>
  );
};

export default PostView;
