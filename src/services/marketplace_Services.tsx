import base64 from 'react-native-base64';
import {formatDate} from '../style/typography';
import {MARKET_API_URL, SHIP_ROCKET} from './api_helper';
import {getIdAsyncStorage, getShipTokenAsyncStorage} from './auth_helper';
import * as url from './url_helper';
export const getCatagorylist = async () => {
  return await fetch(`${MARKET_API_URL}${url.GET_CATAGORY_LIST}`, {
    method: 'GET',
    headers: {
      Cookie:
        'connect.sid=s%3A5_k87BZUnJNbtM9fzRbPxPN955KwZKHc.kzKMZrlhIPSqxQGWPNYqe2NUe6dLXrqGYTFU35%2BkYnQ; connect.sid=s%3AS1YcZcXbq5pc7WH7ccNBplX8V0NaBkva.VDPaN5bhh6dtgbKwhuRrMbGpc0Qdtcf77rX0PHuzcPc',
    },
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

export const addToCartApi = async ({
  productid: productid,
  quantity: quantity,
  buyerid: buyerid,
  variantid: variantid,
  cart_id: cart_id,
}: {
  productid: number;
  quantity: number;
  buyerid: string | number;
  variantid: number | string | undefined;
  cart_id?: string | number;
}) => {
  
  try {
    const response = await fetch(`${MARKET_API_URL}${url.ADD_TO_CART}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie:
          'connect.sid=s%3AHtzPO-8fFAWSDtXhKLYHC5iANtWUQp0l.vAGzDJ2jYL64kQl4DaPtPTQUWx5fj8l%2BhC0nNtflKH0',
      },
      body: JSON.stringify({
        product_id: productid,
        quantity: quantity,
        buyer_id: buyerid,
        variant_id: variantid,
        cart_id: cart_id,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error adding item to cart:', error);
    throw error;
  }
};

export const deleteCartApi = async (cart_item_id: number) => {
  try {
    const response = await fetch(
      `${MARKET_API_URL}${url.DELETE_CART}?id=${cart_item_id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Cookie:
            'connect.sid=s%3AHtzPO-8fFAWSDtXhKLYHC5iANtWUQp0l.vAGzDJ2jYL64kQl4DaPtPTQUWx5fj8l%2BhC0nNtflKH0',
        },
      },
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error adding item to cart:', error);
    throw error;
  }
};

export const getCartItemApi = async ({id}: {id: number | string}) => {
  return await fetch(`${MARKET_API_URL}${url.GET_CART_LIST}?user_id=${id}`, {
    method: 'GET',
    headers: {
      Cookie:
        'connect.sid=s%3AKaKEMvXNn5F4y-7Qv2Ti-7VHQtJfJKnh.K0j3w%2B7o0fOFvuCCZ5DayndXziaAjAxsveEQ6pssgrQ',
    },
  })
    .then(res => res.json())
    .then(async resData => {
      return resData;
    });
};

////

export const GenerateShipToken = async () => {
  return await fetch(`${SHIP_ROCKET}${url.SHIP_TOKEN}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: 'lalitpatidar.ntf@gmail.com',
      password: 'Lalit@12345',
    }),
  })
    .then(res => res.json())
    .then(async resData => {
      return resData;
    });
};

export const GenerateShipOrder = async ({
  orderitem,
  order_id,
  firstname,
  lastname,
  address,
  address1,
  city,
  pincode,
  state,
  country,
  email,
  phone,
  shippingcharge,
  sub_total,
  weight,
}: {
  orderitem: any[];
  order_id: number;
  firstname: string;
  lastname: string;
  address: string;
  address1: string;
  city: string;
  pincode: string;
  state: string;
  country: string;
  email: string;
  phone: string;
  shippingcharge: number | any;
  sub_total: number;
  weight: number;
}) => {
  const orderItems = orderitem.map(item => ({
    name: item.product_name,
    sku: item.variants[0].sku,
    units: item.quantity,
    selling_price: item.variants[0].price,
    discount: '',
    tax: '',
    hsn: 441122,
  }));
  const raw = JSON.stringify({
    order_id: order_id,
    order_date: formatDate(Date.now()),
    pickup_location: 'primary',
    billing_customer_name: `${firstname}`,
    billing_last_name: `${lastname}`, // Combined first and last name
    billing_address: address,
    billing_address_2: address1,
    billing_city: city,
    billing_pincode: pincode, // Ensure pincode is a string
    billing_state: state,
    billing_country: country,
    billing_email: email,
    billing_phone: phone,
    shipping_is_billing: true,
    shipping_customer_name: '',
    shipping_last_name: '',
    shipping_address: '',
    shipping_address_2: '',
    shipping_city: '',
    shipping_pincode: '',
    shipping_country: '',
    shipping_state: '',
    shipping_email: '',
    shipping_phone: '',
    order_items: orderItems,
    payment_method: 'Prepaid',
    shipping_charges: shippingcharge,
    giftwrap_charges: 0,
    transaction_charges: 0,
    total_discount: 0,
    sub_total: sub_total, // Ensure sub_total is correct
    length: 0.6,
    breadth: 0.6,
    height: 0.6,
    weight: weight,
  });

  try {
    const response = await fetch(
      'https://apiv2.shiprocket.in/v1/external/orders/create/adhoc',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${await getShipTokenAsyncStorage()}`,
          'Content-Type': 'application/json', // Added Content-Type header
        },
        body: raw,
      },
    );

    const result = await response.json(); // Parse response as JSON
    console.log("GenerateShipOrder");

    if (!response.ok) {
      throw new Error(result.message || 'Request failed');
    }

    return result;
  } catch (error) {
    console.error('Order API response error: ', error);
    throw error;
  }
};
export const getShippingCharges = async (data: {
  pickup: any;
  delivery: any;
}) => {
  console.log('Request Data:', data);

  try {
    const response = await fetch(
      `https://apiv2.shiprocket.in/v1/external/courier/serviceability/?pickup_postcode=${data.pickup}&delivery_postcode=${data.delivery}&weight=1&cod=0&mode=Surface`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await getShipTokenAsyncStorage()}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const resData = await response.json();

    return resData;
  } catch (error) {
    console.error('Error fetching shipping charges:', error);
    throw error; // Re-throw the error after logging it
  }
};



export const ProductPurchaseService = async ({
  address,
  city,
  state,
  postalCode,
  country,
  countryCode,
  phone,
  total_price,
  products,
  transactionId,
  status,
}: {
  address: string;
  city: string;
  state: string;
  postalCode: string | number;
  country: string | number;
  countryCode?: string | number;
  phone?: string | number;
  total_price: number | any;
  products: any;
  transactionId: string | number;
  status: string | number;
}) => {
  const productitem = products.map((item: any) => {
    const variant = item.variants && item.variants[0];
    return {
      productId: item.product_id,
      variantId: variant.variant_id,
      variantName: variant.color_name, // or some other property
      size: variant.sizes[0].size_name,
      color: variant.color_name[0],
      quantity: item.quantity,
      price: variant.price,
    };
  });
  const payload = {
    userId: await getIdAsyncStorage(),
    products: productitem,
    deliveryAddress: {
      address: address,
      city: city,
      state: state,
      postalCode: postalCode,
      country: country,
      countryCode: '+91',
      phone: phone,
    },
    totalPrice: total_price,
    transactionId: transactionId,
    paymentStatus: status,
  };

  const response = await fetch(`${MARKET_API_URL}${url.PURCHASE_LIST}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const resData = await response.json();
  return resData;
};

export const getAddress = async () => {
  const id = await getIdAsyncStorage();
  return await fetch(`${MARKET_API_URL}${url.GET_ADDRESS}?userId=${id}`, {
    method: 'GET',
  })
    .then(response => response.json())
    .then(async resData => {
      return resData;
    })
    .catch(error => console.error(error));
};

export const Razorpayment = async ({amount}: {amount: number | string| any}) => {
  const razorpayKeyId = 'rzp_test_OUpYVVcWHqlUdQ';
  const razorpayKeySecret = 'm3YovuqD9WjCdSckU5s7xQl8';

  const authString = base64.encode(`${razorpayKeyId}:${razorpayKeySecret}`);
  const basicAuthHeader = `Basic ${authString}`;
  const raw = JSON.stringify({
    amount: amount,
    currency: 'INR',
  });

  return await fetch('https://api.razorpay.com/v1/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: basicAuthHeader,
    },
    body: raw,
  })
    .then(response => response.json())
    .then(async resData => {
      return resData;
    })
    .catch(error => console.error(error));
};

export const ProductReview = async ({
  product_id,
  rating,
  review_text,
}: {
  product_id: number | string;
  rating: number;
  review_text: string;
}) => {
  
  const id = await getIdAsyncStorage();

  const raw = JSON.stringify({
    product_id: product_id,
    user_id: await getIdAsyncStorage(),
    rating: rating,
    review_text: review_text,
  });
  
  return await fetch(`${MARKET_API_URL}${url.REVIEW_PRODUCT}`, {
    method: 'POST',
    headers: {
      Cookie:
        'connect.sid=s%3A1kIiWoMsQLVFYUsGegBbSHhlpNz_l9cs.nxYtMNQEbT32Qbi8fd6N%2FanIH9Xja6mn0XLndQPyfTQ',
    },
    body: raw,
  })
    .then(response => response.json())
    .then(async resData => {
      
      return resData;
    })
    .catch(error => console.error(error));
};
export const getProductlist = async ({
  name,
  filter = {},
  catagory_id,
}: {
  name?: string;
  filter?: any;
  catagory_id: number;
}) => {
  
  const id = await getIdAsyncStorage();
  let mainUrl = `${MARKET_API_URL}${url.GET_PRODUCT_LIST}?page=1&limit=100&user_id=${id}&category_id=${catagory_id}`;
  if (name) {
    mainUrl += `&name=${name}`;
  }
  if (filter?.price_min) {
    mainUrl += `&price_min=${filter?.price_min}`;
  }
  if (filter?.price_max) {
    mainUrl += `&price_max=${filter?.price_max}`;
  }
  if (filter?.order) {
    mainUrl += `&order=${filter?.order === 'High to low' ? 0 : 1}`;
  }
  if (filter?.gender) {
    mainUrl += `&gender=${filter?.gender}`;
  }
  if (filter?.star) {
    mainUrl += `&rating=${filter?.star}`;
  }
  

  return await fetch(mainUrl, {
    method: 'GET',
    headers: {
      Cookie:
        'connect.sid=s%3AfSKd97J79nEsE0_QFSJ4y1zZ7yU8K6vC.I%2FGfXN178pXa%2FftG2Xj1u%2BgKNFadTafFslwjU%2BPXZO0',
    },
  })
    .then(res => res.json())
    .then(resData => resData);
};

export const CreateFavorite = async (data: any) => {
  
  return await fetch(`${MARKET_API_URL}${url.CREATE_FAVORITE}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie:
        'connect.sid=s%3AByr2ZtLu5mJGpQnsbqA1yMI9tsKSpIwa.x0efQJGrm7U2pkNbKpAHy1wbYJhfHqEIPijGTdGyd24',
    },
    body: JSON.stringify(data),
    redirect: 'follow',
  })
    .then(res => res.json())
    .then(resData => resData)
    .catch(error => console.error(error));
};

export const getFavorites = async () => {
  const id = await getIdAsyncStorage();
  if (!id) {
    console.error('ID is null or undefined');
    return;
  }

  return await fetch(`${MARKET_API_URL}${url.GET_FAVORITE}?user_id=${id}`, {
    method: 'GET',
    headers: {
      Cookie:
        'connect.sid=s%3AByr2ZtLu5mJGpQnsbqA1yMI9tsKSpIwa.x0efQJGrm7U2pkNbKpAHy1wbYJhfHqEIPijGTdGyd24',
    },
    redirect: 'follow',
  })
    .then(response => response.json())
    .catch(error => console.error(error));
};

export const getReview = async ({product_id}: {product_id: number | any}) => {
  const id = await getIdAsyncStorage();
  fetch(
    `${MARKET_API_URL}${url.GET_REVIEW}?user_id=${id}&product_id=${product_id}`,
    {
      method: 'GET',
      headers: {
        Cookie:
          'connect.sid=s%3A1kIiWoMsQLVFYUsGegBbSHhlpNz_l9cs.nxYtMNQEbT32Qbi8fd6N%2FanIH9Xja6mn0XLndQPyfTQ',
      },
      redirect: 'follow',
    },
  )
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.error(error));
};
