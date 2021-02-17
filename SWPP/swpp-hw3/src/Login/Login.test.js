import React from "react";
import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";
import { getMockStore } from "../test-utils/mocks";

import * as actionCreators from "../store/actions/index";

import { Route, Redirect, Switch } from "react-router-dom";

import Login from "./Login";

const stubInitialStatearticle = {
  articles: [
    { id: 1, title: "TEST1", author: 1 },
    { id: 2, title: "TEST2", author: 1 },
    { id: 3, title: "TEST3", author: 1 },
  ],
  selectedArticles: null,
};
const stubInitialStatecomment = {
  comments: [],
};

const mockStore = getMockStore(
  stubInitialStatecomment,
  stubInitialStatearticle
);

describe("<Login />", () => {
  let login;

  beforeEach(() => {
    login = (
      <Provider store={mockStore}>
        <Login history={history} />
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render without errors", () => {
    const component = shallow(<Login />);
    const wrapper = component.find(".Login");
    expect(wrapper.length).toBe(0);
  });
  it(`should set state properly on email input`, () => {
    const email = "TEST_EMAIL";
    const component = mount(login);
    const wrapper = component.find("#email-input");
    wrapper.simulate("change", { target: { value: email } });
    const loginInstance = component.find(Login).instance();
    expect(loginInstance.state.email).toEqual(email);
  });
  it(`should set state properly on pw input`, () => {
    const pw = "TEST_PW";
    const component = mount(login);
    const wrapper = component.find("#pw-input");
    wrapper.simulate("change", { target: { value: pw } });
    const loginInstance = component.find(Login).instance();
    expect(loginInstance.state.pw).toEqual(pw);
  });
  it("should login button works", () => {
    const component = mount(login);
    const wrapper = component.find("#login-button");
    wrapper.simulate("click");
  });
  it("should render Login", () => {
    const component = mount(login);
    const wrapper = component.find("Login");
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
  it("should redirect to articles when isvaild true", () => {
    const isvalid = true;
    const component = shallow(<Login isvalid={isvalid} />);
    const wrapper = component.find(".Login");
    expect(wrapper.length).toBe(0);
  });
});
