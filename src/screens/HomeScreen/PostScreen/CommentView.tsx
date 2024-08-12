import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  SafeAreaView,
} from 'react-native';
import React, { Children, useContext, useRef, useState } from 'react';
import { ms } from 'react-native-size-matters';
import { COLORS } from '../../../style';
import { styles } from '../styles';
import AppText from '../../../component/AppText/AppText';
import { reportData } from '../../../component/data/mapdata';
import ImgView from '../../../component/ImgView/ImgView';
import { AuthContext } from '../../../component/auth/AuthContext';
import { requestCommentlist, requestCreateComment } from '../../../services/api_Services';
import { CrossBorderIcon, CrossIcon, CrossRedIcon } from '../../../assets/svgImg/SvgImg';

const CommentView = ({ userId, commentInputRef, GetCommentList, commentData }: any) => {
  const { userToken, userDetails }: any = useContext(AuthContext);
  const [replyToUser, setReplyToUser] = useState<any>('');
  const [comment, setComment] = useState<any>();
  const [replyCheck, setReplyCheck] = useState<any>(false);


  const replyToComment = (userId: any, item: any) => {

    setReplyCheck(item)
    handleAddMention(item)
    commentInputRef?.current?.focus();
  };
  const CreateComment = async (userid: any) => {
    let data : any
    if(replyCheck){
      data = {
        postId: userId?._id,
        token: userToken,
        user_id: userDetails?.id,
        parentCommentId:replyCheck?._id,
        content: comment,
      };

    }else {
      data = {
        postId: userId?._id,
        token: userToken,
        user_id: userDetails?.id,
        content: comment,
      };
    }
   
    try {
      const res = await requestCreateComment(data);

      setComment('');
      GetCommentList(userId?._id);
      setReplyCheck(null)
    } catch (error) {
      console.log('Follow user response: ', error);
    }
  };


  const [formattedText, setFormattedText] = useState('');

  const handleAddMention = (text: any) => {
    const newText = `@${text?.user?.username} `;
    setComment(newText);
    formatText(newText);
  };

  const handleChangeText = (inputText) => {
    setComment(inputText);
    formatText(inputText);
  };

  const formatText = (inputText) => {
    const words = inputText.split(' ');
    const formattedWords = words.map((word, index) => {
      if (word.startsWith('@')) {
        return (
          <AppText key={index} color={COLORS.blue} size={16}>{word}{' '}</AppText>
          
        );
      }
      return <AppText key={index} color={COLORS.white} size={16}>{word}{' '}</AppText>
    });
    setFormattedText(formattedWords);
  };

  return (
    <View>
      <View style={{ height: '92%', }}>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{}}>
          <View style={{}}>
            <View style={[[styles.reportContainer, { flex: 1 }]]}>
              <AppText
                size={16}
                family="PoppinsMedium"
                color={COLORS.white}
                align="center">
                Comments
              </AppText>
              {commentData?.length <= 0 ? (
                <View style={{ marginVertical: ms(10) }}>
                  <AppText
                    size={18}
                    align="center"
                    spacing={2}
                    family="PoppinsMedium"
                    color={COLORS.white}>
                    No comments yet
                  </AppText>
                  <View style={{ marginTop: 10 }} />
                  <AppText
                    size={14}
                    align="center"
                    family="PoppinsMedium"
                    color={COLORS.grey999}>
                    {/* Start the conversation. */}
                  </AppText>
                </View>
              ) : (
                commentData?.map((item: any, index: any) => {
                  return (
                    <View
                      style={[styles.reportView, { flexDirection: 'row' }]}
                      key={index}>
                      <ImgView
                        height={30}
                        width={30}
                        radius={50}
                        dummy={true}
                        url={
                          item?.user?.profile_picture
                            ? { uri: item?.user?.profile_picture }
                            : require('../../../assets/img/profilepic.jpg')
                        }
                      />
                      <View style={{ marginHorizontal: 15 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <AppText
                            size={13}
                            family="PoppinsSemiB"
                            color={COLORS.greyAD}>
                            {item?.user?.username}
                          </AppText>
                          <AppText
                            size={10}
                            horizontal={10}
                            family="PoppinsRegular"
                            color={COLORS.grey737}>
                            {item?.updatedAt}
                          </AppText>
                        </View>
                        <AppText
                          size={12}
                          family="PoppinsMedium"
                          color={COLORS.white}>
                          {item?.content}
                        </AppText>
                        <TouchableOpacity
                          onPress={() => replyToComment(item?.user, item)}>
                          <AppText
                            size={13}
                            family="PoppinsRegular"
                            color={COLORS.grey737}>
                            Reply
                          </AppText>
                        </TouchableOpacity>
                        {/* ----------Comment Reply----------  */}
                        {
                          item?.children.map((replyItem: any, index: number) => {
                            
                            return (
                              <View
                                style={[styles.reportView, { flexDirection: 'row' }]}
                                key={index}>
                                <ImgView
                                  height={25}
                                  width={25}
                                  radius={50}
                                  dummy={true}
                                  url={
                                    replyItem?.user?.profile_picture
                                      ? { uri: replyItem?.user?.profile_picture }
                                      : require('../../../assets/img/profilepic.jpg')
                                  }
                                />
                                <View style={{ marginHorizontal: 15 }}>
                                  <View style={{ flexDirection: 'row' }}>
                                    <AppText
                                      size={11}
                                      family="PoppinsSemiB"
                                      color={COLORS.greyAD}>
                                      {replyItem?.user?.username}
                                    </AppText>
                                    <AppText
                                      size={10}
                                      horizontal={10}
                                      family="PoppinsRegular"
                                      color={COLORS.grey737}>
                                      {replyItem?.updatedAt}
                                    </AppText>
                                  </View>
                                  <AppText
                                    size={12}
                                    family="PoppinsMedium"
                                    color={COLORS.white}>
                                    {replyItem?.content}
                                  </AppText>
                                </View>
                              </View>
                            )
                          })
                        }

                      </View>
                    </View>
                  );
                })
              )}
            </View>
          </View>
          <View style={{height: 25}} />
        </ScrollView>
      </View>

      <KeyboardAvoidingView
        style={{ marginTop: replyCheck ? -70 : -30, backgroundColor: COLORS.black }}
        keyboardVerticalOffset={100}>
        {
          replyCheck && (
            <View style={styles.replyBox}>
              <AppText
                size={13}
                family="PoppinsRegular"
                color={COLORS.blue}
                horizontal={10}>
                {`replying to `}
              </AppText>
              <AppText
                size={13}
                family="PoppinsRegular"
                color={COLORS.blueoff}
                horizontal={10}>
                <TouchableOpacity onPress={()=>{setReplyCheck(null),setComment('')}}>
                  <CrossRedIcon />
                </TouchableOpacity>
              </AppText>
            </View>
          )
        }
        <View style={[styles.commentView]}>


          <ImgView
            height={40}
            width={40}
            radius={50}
            dummy={true}
            url={
              userDetails?.profile_picture
                ? { uri: userDetails?.profile_picture }
                : require('../../../assets/img/profilepic.jpg')
            }
          />
          <AppText
            size={13}
            family="PoppinsRegular"
            color={COLORS.white}
            horizontal={10}>
            {replyToUser && `@${replyToUser}`}
          </AppText>
          <TextInput
            value={comment}
            ref={commentInputRef}
            onFocus={commentInputRef.current?.focus()}
            cursorColor={COLORS.green}
            placeholder="Add a comment..."
            style={[styles.commentTextinput]}
            placeholderTextColor={COLORS.black3030}
            onChangeText={handleChangeText}
          />
          {comment && (
            <TouchableOpacity
              style={styles.toparrow}
              onPress={() => CreateComment(replyCheck)}>
              <Image
                style={{ height: 25, width: 25 }}
                source={require('../../../assets/img/top.png')}
              />
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
      <SafeAreaView />
    </View>
  );
};

export default CommentView;
