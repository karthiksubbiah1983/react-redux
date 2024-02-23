import React, { useEffect } from "react";
import TableComponent from "../../common/table/table";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { postUserPreference } from "../../reducers/userPrefSlice";
import { useNavigate } from "react-router-dom";
import { updatePreference } from "../../reducers/userPostSlice";

const UserInterest = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userDetailStore = useAppSelector((state) => state.userPost.userProfile);
  const availableCountriesStore = useAppSelector(
    (state) => state.availableCountry.availableCountry
  );
  const [userDetail, setUserDetail] = useState({ ...userDetailStore });
  const countries = availableCountriesStore[0]?.country;

  const [isChecked, setIsChecked] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState<string[]>([]);

  useEffect(() => {
    setUserDetail((prevState) => {
      return {
        ...prevState,
        optedCountry: selectedCountry,
      };
    });
  }, [selectedCountry]);

  const onChangeHandler = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.checked) {
      setSelectedCountry([...selectedCountry, countries[index]]);
    } else {
      setSelectedCountry(
        selectedCountry.filter((country) => country !== countries[index])
      );
    }
  };

  const onCheckHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(!event.target.checked);
  };

  const handlePostUserPreference = async () => {
    dispatch(updatePreference(userDetail));
    try {
      await dispatch(postUserPreference(userDetail)).unwrap();
      navigate("/contact/interest/summary");
    } catch (error) {
      console.error("Failed to update profile: ", error);
    }
  };

  return (
    <div className="page-userInterest">
      <h1>
        Welcome {userDetail.fname}, {userDetail.lname}
      </h1>
      <TableComponent
        countries={countries}
        changeHandler={onChangeHandler}
        isSelect={true}
      />
      <div>
        <input type="checkbox" onChange={(event) => onCheckHandler(event)} /> 'I
        agree to the terms and conditions
      </div>
      <input
        type="submit"
        value="Save and Proceed"
        disabled={isChecked}
        onClick={handlePostUserPreference}
      />
    </div>
  );
};

export default UserInterest;
