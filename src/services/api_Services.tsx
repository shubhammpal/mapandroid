import { Alert } from 'react-native';
import { formatDate } from '../style/typography';
import {
  API_URL,
  CLUB_API_URL,
  EVENT_API_URL,
  GROUP_API_URL,
  MAP_URL,
  MARKET_API_URL,
  NOTIFICATION_SEND_URL,
  POST_API_URL,
  SHIP_ROCKET,
  get,
  post,
} from './api_helper';
import { getIdAsyncStorage, getShipTokenAsyncStorage } from './auth_helper';
import * as url from './url_helper';
import base64 from 'react-native-base64';

export const requestLoginOTP = async (data: any) => {
  
  return await fetch(`${API_URL}${url.OTPSENT}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(async resData => {
      return resData;
    });
};
export const requestLoginSocial = async (data: any) => {
  return await fetch(`${API_URL}${url.SOCIAL_LOGIN}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(async resData => {
      return resData;
    });
};
export const requestSocialRegisterApi = async (data: any) => {
  return await fetch(`${API_URL}${url.SOCIAL_REGISTER}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(async resData => {
      return resData;
    });
};
export const requestAddtofav = async (data: any) => {
  return await fetch(`${MAP_URL}6002${url.MAP_ADD_TOFAV}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: data?.token,
    },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(async resData => {
      return resData;
    });
};
export const requestVerifyOtp = async (data: any) => {
  
  return await fetch(`${API_URL}${url.VERIFY_OTP}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(async resData => {
      return resData;
    });
};



export const requestCompleteProfile = async (data: any) => {
  return await fetch(`${API_URL}${url.REGISTRATION}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(async resData => {
      return resData;
    });
};


export const requestGetDetails = async (data: any) => {
  const api_url = data?.loginUserId
    ? `${API_URL}${url.USER_DETAILA}?user_id=${data?.user_id}&loginUserId=${data?.loginUserId}`
    : `${API_URL}${url.USER_DETAILA}?user_id=${data?.user_id}`;

  return await fetch(api_url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: data?.token,
    },
  },
  )
    .then(res => res.json())
    .then(async resData => {
      return resData;
    });
};
export const requestBikeModal = async () => {
  const api_url = `${API_URL}${url.BIKE_MODAL}`;
  return await fetch(api_url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  },
  )
    .then(res => res.json())
    .then(async resData => {
      return resData;
    });
};

export const requestGETFavride = async (data: any) => {
  return await fetch(`${MAP_URL}6002${url.MAP_GET_FAV}?userId=${data?.userId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: data?.token,
    },
  },
  )
    .then(res => res.json())
    .then(async resData => {
      return resData;
    });
};
export const requestBikeModalList = async (data: any) => {
  const api_url = `${API_URL}${url.BIKE_MODAL_LIST}?brand_id=${data?.id}`;
  return await fetch(api_url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  },
  )
    .then(res => res.json())
    .then(async resData => {
      return resData;
    });
};
export const requestContactSync = async (data: any) => {

  return await fetch(`${API_URL}${url.CONTACT_SYNC}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(async resData => {

      return resData;
    });
};
export const requestUsernameapi = async (data: any) => {
  return await fetch(`${API_URL}${url.USER_NAME}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: data?.token,
    },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(async resData => {
      return resData;
    });
};

export const requestProfileImage = async (data: any) => {
  let formdata = new FormData();
  if (data?.profile_picture) {
    formdata.append(`profile_picture`, {
      uri: data?.profile_picture,
      type: 'image/jpeg',
      name: 'image.jpg',
    });
  }
  return await fetch(
    `${API_URL}${url.PROFILE_IMAGE}?user_id=${data?.user_id}`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: data?.token,
      },
      body: formdata,
    },
  )
    .then(res => res.json())
    .then(async resData => {
      return resData;
    });
};

export const requestPostList = async (data: any) => {
  let api_url = `${POST_API_URL}${url.POST_LIST}?login_user_id=${data?.login_user_id}&page=${data?.page}&limit=10`
  if (data?.id) {
    api_url += `&id=${data?.id}`;
  }
  return await fetch(api_url,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: data?.token,
      },
    },
  )
    .then(res => res.json())
    .then(async resData => {
      return resData;
    });
};

export const requestCreateGroup = async (data: any) => {

  let formdata = new FormData();
  formdata.append('name', data?.name);
  formdata.append('description', data?.description);
  formdata.append('owner_id', data?.owner_id);
  if (data?.image) {
    formdata.append(`image`, {
      uri: data?.image,
      type: 'image/jpeg',
      name: 'image.jpg',
    });
  }
  return await fetch(`${GROUP_API_URL}${url.CREATE_GROUP}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: data?.token,
    },
    body: formdata,
  })
    .then(res => res.json())
    .then(async resData => {

      return resData;
    });
};

export const requestGetUserList = async (data: any) => {
  return await fetch(`${GROUP_API_URL}${url.GET_ALLUSER}?user_id=${data?.user_id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: data?.token,
    },
  })
    .then(res => res.json())
    .then(async resData => {
      return resData;
    });
};

export const requestAddMembertoGroup = async (data, tokenData) => {
  return await fetch(`${GROUP_API_URL}${url.ADD_MEMBERSTO_GROUP}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: tokenData?.token,
    },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(async resData => {
      return resData;
    });
};

export const requestGetGroupList = async (data: any) => {

  return await fetch(
    `${GROUP_API_URL}${url.GET_GROUP_LIST}?user_id=${data?.user_id}&logged_in_user_id=${data?.logged_in_user_id}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: data?.token,
      },
    },
  )
    .then(res => res.json())
    .then(async resData => {
      return resData;
    });
};

export const requestGetClubList = async (data: any) => {
  let urlMain = `${CLUB_API_URL}${url.GET_CLUB_LIST}?type=created&page=${data?.page}&pageSize=10&search&userId=${data?.userId}`
  // if(data?.clubId){
  //   urlMain += `&clubId=${data?.clubId}`
  // }
  return await fetch(urlMain,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: data?.token,
      },
    },
  )
    .then(res => res.json())
    .then(async resData => {

      return resData;
    });
};

export const requestGetAllClubList = async (data: any) => {
  let api_url = `${CLUB_API_URL}${url.GET_ALLCLUB_LIST}?pageSize=10&page=${data?.page}&user_id=${data?.userId}`
  if (data?.location) {
    api_url += `&location=${data?.location}`;
  }
  return await fetch(
    api_url,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: data?.token,
      },
    },
  )
    .then(res => res.json())
    .then(async resData => {
      return resData;
    });
};
export const requestPotlikeunlike = async (data, postId, token) => {

  return await fetch(`${POST_API_URL}${url.POST_LIKE}?postId=${postId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: data?.token,
    },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(async resData => {
      return resData;
    });
};

export const requestGetgroupdetails = async (data: any) => {
  return await fetch(
    `${GROUP_API_URL}${url.GET_GROUP_DETAILS}?groupId=${data?.groupId}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: data?.token,
      },
    },
  )
    .then(res => res.json())
    .then(async resData => {
      return resData;
    });
};

export const getAllRequestList = async (data: any) => {
  return await fetch(
    `${NOTIFICATION_SEND_URL}${url.GET_LIST_REQUEST}${data?.userId}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: data?.token,
      },
    },
  )
    .then(res => res.json())
    .then(async resData => {
      return resData;
    });
};

export const getAllRequestListAdmin = async (data: any) => {
  return await fetch(
    `${CLUB_API_URL}${url.GET_LIST_REQUEST}${data?.userId}&type=admin`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: data?.token,
      },
    },
  )
    .then(res => res.json())
    .then(async resData => {
      
      return resData;
    });
};

export const requestCreateEvent = async (data: any) => {

  let formdata = new FormData();
  formdata.append('title', data?.title);
  formdata.append('description', data?.description);
  formdata.append('startTime', data?.startTime);
  formdata.append('endTime', data?.endTime);
  formdata.append('reportingTime', data?.reportingTime);
  formdata.append('totalKms', data?.totalKms);
  formdata.append('startingPoint', data?.startingPoint);
  formdata.append('destination', data?.destination);
  // formdata.append('whatsAppLink', data?.whatsAppLink);
  formdata.append('fromLocation[name]', data?.fromLocation_name);
  formdata.append('fromLocation[latitude]', data?.fromLocation_lat);
  formdata.append('fromLocation[longitude]', data?.fromLocation_long);
  formdata.append('toLocation[name]', data?.toLocation_name);
  formdata.append('toLocation[latitude]', data?.toLocation_lat);
  formdata.append('toLocation[longitude]', data?.toLocation_long);
  formdata.append('owner_id', data?.owner_id);
  formdata.append('rideDuration', data?.rideDuration);
  if (data?.groupId) {
    formdata.append('groupId', data?.groupId);
  }

  if (data?.clubId) {
    formdata.append('clubId', data?.clubId);
  }

  if (data?.ridingSkills) {
    formdata.append('ridingSkills', data?.ridingSkills);
  }

  if (data?.bikeCC) {
    formdata.append('bikeCC', data?.bikeCC);
  }

  if (data?.rideGroup) {
    formdata.append('rideGroup', data?.rideGroup);
  }

  if (data?.maxRiders) {
    formdata.append('maxRiders', data?.maxRiders);
  }

  if (data?.files) {
    formdata.append('files', {
      uri: data?.files,
      type: 'image/jpeg',
      name: 'image.jpg',
    });
  }
  
  return await fetch(`${EVENT_API_URL}${url.CREATE_EVENT}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: data?.token,
    },
    body: formdata,
  })
    .then(res => res.json())
    .then(async resData => {
      return resData;
    });
};

export const requestUpdateEvent = async (data: any, id: any) => {

  let formdata = new FormData();
  formdata.append('title', data?.title);
  formdata.append('description', data?.description);
  formdata.append('startTime', data?.startTime);
  formdata.append('endTime', data?.endTime);
  formdata.append('reportingTime', data?.reportingTime);
  formdata.append('totalKms', data?.totalKms);
  formdata.append('startingPoint', data?.startingPoint);
  formdata.append('destination', data?.destination);
  formdata.append('whatsAppLink', data?.whatsAppLink);
  formdata.append('fromLocation[name]', data?.fromLocation_name);
  formdata.append('fromLocation[latitude]', data?.fromLocation_lat);
  formdata.append('fromLocation[longitude]', data?.fromLocation_long);
  formdata.append('toLocation[name]', data?.toLocation_name);
  formdata.append('toLocation[latitude]', data?.toLocation_lat);
  formdata.append('toLocation[longitude]', data?.toLocation_long);
  formdata.append('owner_id', data?.owner_id);
  formdata.append('rideDuration', data?.rideDuration);
  if (data?.groupId) {
    formdata.append('groupId', data?.groupId);
  }

  if (data?.clubId) {
    formdata.append('clubId', data?.clubId);
  }

  if (data?.ridingSkills) {
    formdata.append('ridingSkills', data?.ridingSkills);
  }

  if (data?.bikeCC) {
    formdata.append('bikeCC', data?.bikeCC);
  }

  if (data?.rideGroup) {
    formdata.append('rideGroup', data?.rideGroup);
  }

  if (data?.maxRiders) {
    formdata.append('maxRiders', data?.maxRiders);
  }

  if (data?.files) {
    formdata.append('files', {
      uri: data?.files,
      type: 'image/jpeg',
      name: 'image.jpg',
    });
  }
  return await fetch(`${EVENT_API_URL}${url.UPDATE_EVENT}/${id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: data?.token,
    },
    body: formdata,
  })
    .then(res => res.json())
    .then(async resData => {
      return resData;
    });
};

export const requestEventList = async (data: any) => {
  return await fetch(`${EVENT_API_URL}${url.GET_EVENT_LIST}/${data?.id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: data?.token,
    },
  })
    .then(res => res.json())
    .then(async resData => {
      return resData;
    });
};

export const requestRideDetails = async (data: any) => {

  return await fetch(`${EVENT_API_URL}${url.GET_EVENT_DETAILS}?eventId=${data?.rideId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: data?.token,
    },
  })
    .then(res => res.json())
    .then(async resData => {
      return resData;
    });
};
export const requestAllEventList = async (data: any) => {

  return await fetch(`${EVENT_API_URL}${url.GET_ALL_EVENT_LIST}?user_id=${data?.user_id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: data?.token,
    },
  })
    .then(res => res.json())
    .then(async resData => {
      return resData;
    });
};
export const requestClubEventList = async (data: any) => {
  return await fetch(`${EVENT_API_URL}${url.GET_CLUBEVENT_LIST}/${data?.id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: data?.token,
    },
  })
    .then(res => res.json())
    .then(async resData => {
      return resData;
    });
};

export const requestMemberListbyGroup = async (data: any) => {
  return await fetch(
    `${GROUP_API_URL}${url.GET_MEMBER_LIST}?group_id=${data?.group_id}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: data?.token,
      },
    },
  )
    .then(res => res.json())
    .then(async resData => {
      return resData;
    });
};

export const requestMemberListbyClub = async (data: any) => {
  return await fetch(
    `${CLUB_API_URL}${url.GET_CLUBMEMBER_LIST}?clubId=${data?.clubId}&search=${data?.search}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: data?.token,
      },
    },
  )
    .then(res => res.json())
    .then(async resData => {
      return resData;
    });
};

export const requestGeteventlistDetails = async (data: any) => {
  return await fetch(
    `${EVENT_API_URL}${url.GET_MEMBER_LIST_DETAILS}/${data?.id}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: data?.token,
      },
    },
  )
    .then(res => res.json())
    .then(async resData => {
      return resData;
    });
};

export const requestFollowlist = async (data: any) => {
  return await fetch(
    `${API_URL}${url.FOLLOW_LIST}?user_id=${data?.user_id}&login_user_id=${data?.login_user_id}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: data?.token,
      },
    },
  )
    .then(res => res.json())
    .then(async resData => {
      return resData;
    });
};

export const requestEventUserRegister = async (data: any) => {

  return await fetch(`${EVENT_API_URL}${url.EVENT_USER_REGISTER}/${data?.id}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: data?.token,
    },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(async resData => {
      return resData;
    });
};

export const requestFollowUser = async (data: any) => {
  return await fetch(`${API_URL}${url.FOLLOW_USER}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: data?.token,
    },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(async resData => {
      return resData;
    });
};

export const requestReport = async (data: any) => {
  return await fetch(`${POST_API_URL}${url.REPORT}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: data?.token,
    },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(async resData => {
      return resData;
    });
};
export const requestCreatePost = async (data: any) => {

  let formdata = new FormData();
  formdata.append('user', data?.user);
  formdata.append('description', data?.description);
  formdata.append('visibility', data?.visibility);
  formdata.append('location', data?.location);
  formdata.append('postType', 'post');
  formdata.append('color', data?.color);
  data?.tags.forEach((tag: any, index: any) => {
    formdata.append(`tags[${index}]`, tag);
  });
  if (data?.files) {
    if (data.files.type === 'image') {
      formdata.append('files', {
        uri: data.files.path,
        type: 'image/jpeg',
        name: 'image.jpg',
      });
    } else if (data.files.type === 'video') {
      formdata.append('files', {
        uri: data.files.path,
        type: 'video/mp4',
        name: 'video.mp4',
      });
    }
  }

  return await fetch(`${POST_API_URL}${url.POST_CREATE}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: data?.token,
    },
    body: formdata,
  })
    .then(res => res.json())
    .then(async resData => {
      return resData;
    });
};


export const requestAddEventImages = async (data: any) => {

  let formdata = new FormData();
  if (data?.files) {
    formdata.append(`files`, {
      uri: data?.files,
      type: 'image/jpeg',
      name: 'image.jpg',
    });
  }
  return await fetch(
    `${EVENT_API_URL}${url.ADD_EVENT_IMAGE}/${data?.id}`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: data?.token,
      },
      body: formdata,
    },
  )
    .then(res => res.json())
    .then(async resData => {
      return resData;
    });
};

export const requestPlacesDatapost = async (data: any) => {

  return await fetch(`${MAP_URL}6002${url.MAP_PLACES_POST_DATA}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: data?.token,
    },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(async resData => {
      return resData;
    });
};
export const getEventRideData = async (data: any) => {
  return await fetch(
    `${MAP_URL}6002${url.EVENT_RIDE_DETAILS}?eventId=${data?.eventId}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: data?.token,
      },
    },
  )
    .then(res => res.json())
    .then(async resData => {
      return resData;
    });
};

export const getAttendenceList = async (data: any) => {
  return await fetch(
    `${EVENT_API_URL}${url.ATTENDENCE_LIST}?eventId=${data?.eventId}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: data?.token,
      },
    },
  )
    .then(res => res.json())
    .then(async resData => {
      return resData;
    });
};

export const requestRideHistoryApi = async (data: any) => {

  return await fetch(`${MAP_URL}6002${url.MAP_BIKE_HISTORY_CREATE}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: data?.token,
    },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(async resData => {
      return resData;
    });
};

export const requstImageUploadInSoloRIde = async (data: any) => {

  let formdata = new FormData();
  if (data?.image) {
    formdata.append(`image`, {
      uri: data?.image,
      type: 'image/jpeg',
      name: 'image.jpg',
    });
    formdata.append('lat', data?.lat)
    formdata.append('lng', data?.lng)
    if (data?.report) {
      formdata.append('report', data?.report)
    }
  }
  return await fetch(
    `${MAP_URL}6002${url.SOLO_RIDE_IMAGE_UPLOAD}${data?.rideId}`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: data?.token,
      },
      body: formdata,
    },
  )
    .then(res => res.json())
    .then(async resData => {

      return resData;
    });
};
export const requestClubrequest = async (data: any) => {
  // Create a new FormData object
  const formData = new FormData();
  formData.append('chatRestriction', data.chatRestriction);
  formData.append('clubName', data.clubName);
  formData.append('club_logo', {
    uri: data.club_logo,
    type: 'image/jpeg', // Adjust the type as needed
    name: 'club_logo.jpg'
  });
  formData.append('description', data.description);
  formData.append('email', data.email.toLowerCase());
  formData.append('headquarterName', data.headquarterName);
  formData.append('registrationNumber', `mytra-${data.registrationNumber}`);
  formData.append('startDate', data.startDate);
  formData.append('userId', data.userId);
  formData.append('address', data?.address);

  return await fetch(`${CLUB_API_URL}${url.GET_CLUBREQUEST}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: data?.token,
    },
    body: formData,
  })
    .then(res => res.json())
    .then(async resData => {
      return resData;
    });
};
export const requestFeedbackcreate = async (data: any) => {
  return await fetch(`${CLUB_API_URL}${url.FEEDBACK_CREATE}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: data?.token,
    },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(async resData => {
      return resData;
    });
};

export const requestSOSlist = async (data: any) => {
  return await fetch(
    `${API_URL}${url.SOS_LIST}?user_id=${data?.user_id}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: data?.token,
      },
    },
  )
    .then(res => res.json())
    .then(async resData => {
      return resData;
    });
};

export const requestAddSos = async (data: any) => {
  return await fetch(`${API_URL}${url.ADD_SOS}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: data?.token,
    },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(async resData => {
      return resData;
    });
};

export const requestClubFetchWITHLINK = async (data: any) => {
  return await fetch(`${CLUB_API_URL}${url.REQUEST_CLUB_JOIN_WITH_LINK}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: data?.token,
    },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(async resData => {
      return resData;
    });
};
export const requestClubstatusCheck = async (data: any) => {

  return await fetch(`${CLUB_API_URL}${url.CHECK_CLUB_STATUS}?club_id=${data?.club_id}&user_id=${data?.user_id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: data?.token,
    },
  })
    .then(res => res.json())
    .then(async resData => {
      return resData;
    });
};

export const requestDeleteSos = async (data: any) => {
  return await fetch(`${API_URL}${url.DELETE_SOS}?id=${data?.id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: data?.token,
    },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(async resData => {
      return resData;
    });
};

export const requestDeleteAccount = async (data: any) => {
  return await fetch(`${API_URL}${url.DELETE_ACCOUNT}?user_id=${data?.user_id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: data?.token,
    },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(async resData => {
      return resData;
    });
};
export const requestUpdateMobile = async (data: any) => {
  return await fetch(`${API_URL}${url.UPDATE_MOBILE}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(async resData => {
      return resData;
    });
};

export const GetBannerList = async () => {
  return await fetch(`${MARKET_API_URL}${url.GET_MARKET_BANNER}`, {
    method: 'GET',
    headers: {
      Authorization:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcyMDQzMDcxNiwiZXhwIjoxNzIxNzI2NzE2fQ.k7zw4t8FtDwS9INTVoVyQOhyRoGmzyMGa3qdxgl_Yd4',
      Cookie:
        'connect.sid=s%3AKaKEMvXNn5F4y-7Qv2Ti-7VHQtJfJKnh.K0j3w%2B7o0fOFvuCCZ5DayndXziaAjAxsveEQ6pssgrQ',
    },
  })
    .then(res => res.json())
    .then(async resData => {
      return resData;
    });
};


export const fetchDirections = async (origin: any, destination: any, exclude?: string) => {
  const accessToken = 'sk.eyJ1IjoiaW5pdHgiLCJhIjoiY2x5cG15cDB2MDJiczJrcXY0NWlrNm9zNiJ9.m6hqEs850sg6Tt0FpERjPg';
  let url = `https://api.mapbox.com/directions/v5/mapbox/driving/${origin[0]},${origin[1]};${destination[0]},${destination[1]}?geometries=geojson&language=en&overview=full&steps=true&access_token=${accessToken}`;
  if (exclude) {
    url += `&exclude=${exclude}`;
  }
 
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.routes.length) {
      return data.routes[0];
    } else {
      throw new Error('No routes found');
    }
  } catch (error) {
    console.error('Error fetching directions:', error);
  }
}

export const requestCommentlist = async (data: any) => {
  return await fetch(
    `${POST_API_URL}${url.COMMENT_API}?postId=${data?.postId}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: data?.token,
      },
    },
  )
    .then(res => res.json())
    .then(async resData => {
      return resData;
    });
};
export const requestCreateComment = async (data: any) => {
  let api_url = `${POST_API_URL}${url.COMMENT_CREATE}?postId=${data?.postId}`
  if (data?.parentCommentId) {
    api_url += `&parentCommentId=${data?.parentCommentId}`;
  }
  return await fetch(api_url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: data?.token,
    },
    body: JSON.stringify({
      user_id: data?.user_id,
      content: `${data?.content}`
    }),
  })
    .then(res => res.json())
    .then(async resData => {
      return resData;
    });
};





export const requestgetmybikeList = async (data: any) => {
  return await fetch(
    `${API_URL}${url.MY_BIKE_LIST}?user_id=${data?.user_id}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: data?.token,
      },
    },
  )
    .then(res => res.json())
    .then(async resData => {
      return resData;
    });
};

export const requestnewbikeadd = async (data: any, token: any) => {
  return await fetch(`${API_URL}${url.ADD_NEW_BIKE}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(async resData => {
      return resData;
    });
};

export const requestnewbikedelete = async (data: any, token: any) => {
  return await fetch(`${API_URL}${url.DELETE_NEW_BIKE}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(async resData => {
      return resData;
    });
};


export const requestJoinCommunity = async (data: any) => {
  return await fetch(`${CLUB_API_URL}${url.JOIN_CLUB}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: data?.token,
    },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(async resData => {
      return resData;
    });
};

export const requestJoinClubAdd = async (data: any) => {
  return await fetch(`${CLUB_API_URL}${url.REQUEST_TO_ADD_MEMBER}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: data?.token,
    },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(async resData => {
      return resData;
    });
};

export const requestJoinAcceptReject = async (data: any) => {
  return await fetch(`${CLUB_API_URL}${url.REQUEST_ACCEPT_REJECT}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: data?.token,
    },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(async resData => {
      return resData;
    });
};

export const requestForNotiReadReject = async (data: any) => {
  return await fetch(`${NOTIFICATION_SEND_URL}${url.REQUESR_NOTIFICATION_READ}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: data?.token,
    },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(async resData => {
      return resData;
    });
};

export const requestNotificationSend = async (data: any) => {
  return await fetch(`${NOTIFICATION_SEND_URL}${url.NOTIFACATION_SEND_REQUEST}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: data?.token,
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(async resData => {
      
      return resData;
    });
};

export const requestGetTagUserList = async (data: any) => {
  return await fetch(`${GROUP_API_URL}${url.GET_TAG_USER}?search=${data?.searchText}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: data?.token,
    },
  })
    .then(res => res.json())
    .then(async resData => {
      return resData;
    });
};


export const deletePost = async (data: any) => {
  

  return await fetch(`${POST_API_URL}${url.DELETE_POST}?id=${data?.post_id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: data?.token,
    },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(async resData => {
      return resData;
    });
};


  export const requestUpdatePost = async (data: any) => {
    
    let api_url = `${POST_API_URL}${url.POST_UPDATE}?id=${data?.postId}`
    return await fetch(api_url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type':  'application/json',
        Authorization: data?.token,
      },
      body: JSON.stringify({
      
        description: data?.description,
        location: data?.location,
        tags: data?.tags || []
      
      }),
    })
      .then(res => res.json())
      .then(async resData => {
        return resData;
      });
    }
  
  
  export const blockedGetUserList = async (data: any) => {
    let api_url = `${API_URL}${url.GET_ALLBLOCKED_USER}?user_id=${data?.user_id}`
    
    return await fetch(api_url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: data?.token,
      },
    })
      .then(res => res.json())
      .then(async resData => {
        return resData;
      });
  };
  
  export const requestUnblock= async (data: any) => {
    
    let api_url = `${API_URL}${url.REQUEST_BLOCKED_USER}?user_id=${data?.user_id}`
  
    return await fetch(api_url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: data?.token,
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(async resData => {
        return resData;
      });
  };
  