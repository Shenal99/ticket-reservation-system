import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import "../res/css/login.css";

export default function LoginPage() {
  const [uname, setUname] = useState("");
  const [pwrd, setPwrd] = useState("");

  function loginUser() {
    const data = { 
      username: uname,
      password: pwrd
    }

  }

  return (
    <>
      <section class="vh-100">
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-6 text-black">
              <div class="px-5 ms-xl-4">
                <div
                  class="fas fa-crow fa-2x me-3 pt-5 mt-xl-4"
                  style={{color: '#709085'}}
                ></div>
                {/* <img src="../res/images/logo5.png" /> */}
              </div>

              <div class="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                <form style={{width: '23rem'}}>
                  <h1 class="fw-normal mb-3 pb-3 ">
                    Log in
                  </h1>

                  <div class="form-outline mb-4">
                    <input
                      type="email"
                      id="form2Example18"
                      class="form-control form-control-lg"
                      onChange={e => {
                        setUname(e.target.value)
                      }}
                    />
                    <label class="form-label" for="form2Example18">
                      Email address
                    </label>
                  </div>

                  <div class="form-outline mb-4">
                    <input
                      type="password"
                      id="form2Example28"
                      class="form-control form-control-lg"
                      onChange={e => {
                        setPwrd(e.target.value)
                      }}
                    />
                    <label class="form-label" for="form2Example28">
                      Password
                    </label>
                  </div>

                  <div class="pt-1 mb-4">
                    <button class="btn btn-info btn-lg btn-block" type="button" onClick={loginUser}>
                      Login
                    </button>
                  </div>

                  <p class="small mb-5 pb-lg-2">
                    <a class="text-muted" href="#!">
                      Forgot password?
                    </a>
                  </p>
                </form>
              </div>
            </div>
            <div class="col-sm-6 px-0 d-none d-sm-block">
              <img
                src={require("../res/images/train.jpg")}
                alt="Login image"
                class="w-100 vh-100"
                
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
