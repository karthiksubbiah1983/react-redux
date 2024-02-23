import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import AutocompleteDropdown from "../../common/autoComplete/autoComplete";
import { useNavigate } from "react-router-dom";
import { updatePreference } from "../../reducers/userPostSlice";
import { fetchAvailableCountries } from "../../reducers/availableCountrySlice";

interface UserDetail {
  fname?: string;
  lname?: string;
  country?: string;
  travelDate?: string;
}

const Contact = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const availableCountriesStore = useAppSelector(
    (state) => state.availableCountry.availableCountry
  );
  const userDetailStore = useAppSelector((state) => state.userPost.userProfile);
  const [userDetail, setUserDetail] = useState(userDetailStore);
  const { fname, lname, country, travelDate } = userDetail;
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const localCountries = ["India", "USA", "UK", "Canada", "Australia"];

  const checkFormStatus = (userDetail: UserDetail) => {
    if (fname && lname && country && travelDate) {
      setIsButtonEnabled(false);
    } else {
      setIsButtonEnabled(true);
    }
  };

  useEffect(() => {
    dispatch(fetchAvailableCountries());
  }, []);

  useEffect(() => {
    checkFormStatus(userDetail);
  }, [userDetail]);

  const getSelectedCountry = (country: string) => {
    setUserDetail({
      ...userDetail,
      country: country,
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetail({
      ...userDetail,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(userDetail);
    navigate("/contact/interest");
    dispatch(updatePreference(userDetail));
  };

  return (
    <div>
      <h1>Contact</h1>
      <form onSubmit={handleSubmit}>
        <label>First Name:</label>
        <input
          type="text"
          id="fname"
          name="fname"
          value={userDetail.fname}
          onChange={handleInputChange}
          required
        />
        <br />
        <label>Last Name:</label>
        <input
          type="text"
          id="lname"
          name="lname"
          value={userDetail.lname}
          onChange={handleInputChange}
          required
        />
        <br />
        <label>Country:</label>
        <AutocompleteDropdown
          countryHandler={getSelectedCountry}
          countryList={availableCountriesStore[0]?.country || localCountries}
          defaultValue={userDetail.country}
        />

        <label>Date of Birth:</label>
        <input
          type="date"
          id="travelDate"
          name="travelDate"
          value={userDetail.travelDate}
          onChange={handleInputChange}
          required
        />
        <br />
        <input
          disabled={isButtonEnabled}
          type="submit"
          value="Save and Proceed"
        />
      </form>
    </div>
  );
};

export default Contact;
