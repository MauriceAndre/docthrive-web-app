import React from "react";
import { connect } from "react-redux";
import LoginForm from "../common/LoginForm";
import RegisterForm from "../common/RegisterForm";

function Home({ user }) {
  if (user) return (window.location = "/archive");

  return (
    <div className="section-content overflow-auto">
      <h1 className="text-center display-3">DocThrive</h1>
      <div className="d-flex flex-column flex-md-row justify-content-around align-items-center">
        <div className="position-relative w-100 m-4 p-4 border rounded bg-light">
          <LoginForm title={true} />
        </div>
        <strong className="m-3">OR</strong>
        <div className="position-relative w-100 m-4 p-4 border rounded bg-light">
          <RegisterForm title={true} />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ user }) => {
  return {
    user: user.user,
  };
};

export default connect(mapStateToProps)(Home);
