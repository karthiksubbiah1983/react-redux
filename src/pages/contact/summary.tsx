import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { fetchUserPost } from "../../reducers/userPostSlice";

const Summary = () => {
  const userPost = useAppSelector((state) => state.userPost);
  const userProfile = useAppSelector((state) => state.userPost.userProfile);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUserPost());
  }, []);

  return (
    <div className="page-userInterest">
      <h1>
        Thank you {userProfile.fname}, {userProfile.lname} has planned his
        travel to {userProfile.country} on {userProfile.travelDate}
      </h1>
      <table className="c-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Preferred Country</th>
          </tr>
        </thead>
        <tbody>
          {userPost.userPost.map((userPost, index) => {
            return (
              <tr key={index}>
                <td>{userPost.fname}</td>
                <td>
                  <ul>
                    {userPost.optedCountry.map((country, index) => {
                      return (
                        <li key={index}>
                          <p>{country}</p>
                        </li>
                      );
                    })}
                  </ul>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Summary;
