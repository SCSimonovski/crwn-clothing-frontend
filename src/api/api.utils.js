import { store } from "../redux/store";
import { signOutSuccess } from "../redux/user/user.actions";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_9QwZypapZMNLPEyeXeVLzFMO00SeX37MqY");

export const sendRequest = async (
  url,
  method = "GET",
  headers,
  body = null
) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}${url}`, {
      method,
      body: body ? JSON.stringify(body) : null,
      headers,
    });

    if (response.status === 205) {
      store.dispatch(signOutSuccess());
    }

    if (response.headers.get("Content-Length") === "0") {
      return;
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    return data;
  } catch (err) {
    throw err;
  }
};

//////////////////////////////////////////////////////////////
// SIGN IN ///////////////////////////////////////////////////

export const signInWithEmailAndPassword = async (user) => {
  const data = await sendRequest(
    `/users/login`,
    "POST",
    { "Content-Type": "application/json" },
    user
  );

  return data;
};

// SIGN IN WITH GOOGLE /////////////////////////////////////

export const signInWithGoogleRequest = async (tokenId) => {
  const data = await sendRequest(
    `/users/login/google`,
    "POST",
    { "Content-Type": "application/json" },
    { tokenId }
  );

  return data;
};

///////////////////////////////////////////////////////////////
// CREATE USER ////////////////////////////////////////////////

export const createUserWithEmailAndPassword = async (user) => {
  const data = await sendRequest(
    `/users`,
    "POST",
    { "Content-Type": "application/json" },
    user
  );

  return data;
};

////////////////////////////////////////////////////////////////
// SIGN OUT ////////////////////////////////////////////////////

export const signOutRequest = async (id, token) => {
  return await sendRequest(
    `/users/logout`,
    "POST",
    { "Content-Type": "application/json" },
    { id, token }
  );
};

////////////////////////////////////////////////////////////
// FETCH SECTIONS //////////////////////////////////////////

export const fetchSections = async () => await sendRequest(`/sections`);

/////////////////////////////////////////////////////////////
// FETCH COLLECTIONS ////////////////////////////////////////

export const fetchCollections = async () => {
  let sections = await sendRequest(`/sections`);

  const promises = await sections.map(async (section) => {
    section.routeName = section.title.toLowerCase();
    const items = await sendRequest(`/sections/${section.title}/items`);

    return { ...section, items };
  });

  let collections = await Promise.all(promises);

  collections = collections.reduce((result, collection, index) => {
    result[collection.routeName] = collection;
    return result;
  }, {});

  return collections;
};

//////////////////////////////////////////////////////////////////////
// CREATE CHECKOUT ///////////////////////////////////////////////////

export const createCheckout = async ({ items, token }) => {
  // Get Stripe.js instance

  const stripe = await stripePromise;

  // Call your backend to create the Checkout Session
  try {
    const session = await sendRequest(
      "/create-checkout-session",
      "POST",
      {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      { items }
    );

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      throw new Error();
    } else {
      return {
        message:
          "You have successfuly purchased the products. Thank you for your order.",
      };
    }
  } catch (err) {
    return { error: "The purchase cannot be completed, please try again." };
  }
};
