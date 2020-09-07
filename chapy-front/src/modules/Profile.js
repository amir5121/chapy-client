import React from "react";
import { useSelector } from "react-redux";
import { isMobileSelector } from "../redux/reducer/ConfigSlice";
import ProfileForm from "../components/profileForm/ProfileForm";
import { selectMe } from "../redux/reducer/MeSlice";

export default function Profile() {
  // const dispatch = useDispatch();
  const isMobile = useSelector(isMobileSelector);
  const me = useSelector(selectMe);
  // const history = useHistory();

  const onFinish = (values) => {
    // dispatch(registerUser(values))
    //   .then(unwrapResult)
    //   .then((originalPromiseResult) => {
    //     console.log("originalPromiseResult", originalPromiseResult);
    //     isLoggedIn() && history.push("/login/");
    //   })
    //   .catch((serializedError) => {
    //     console.log("serializedError", serializedError);
    //   });
  };

  return <ProfileForm onFinish={onFinish} isMobile={isMobile} me={me} />;
}
