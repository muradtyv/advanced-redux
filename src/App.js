import { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useDispatch } from "react-redux";
import { uiActions } from "./store/ui-slice";
import Notification from "./components/UI/Notification";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  // const notification = useSelector((state) => state.ui.notification);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    const sendCart = async () => {
      
      dispatch(
        uiActions.showNotification({
          status: "pending...",
          title: "sending...",
          message: "sending data...",
        })
      );
      const response = await fetch(
        "https://react-http-201e1-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) {
        throw new Error("sending cart data failed.");
      }

     

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "sent data successfuly!",
        })
      );

      
      // const responseData = response.json();
    };

    if(isInitial) {
      isInitial = false;
      return;
    }
    
    sendCart().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed!',
        })
      );
    }); 
  }, [cart, dispatch]);

  return (
    <Fragment>
        {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
