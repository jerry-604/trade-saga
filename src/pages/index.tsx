import { trpc } from '../utils/trpc';
import { User } from '@prisma/client'
import PropTypes from "prop-types";
import React from "react";


export default function HomePage() {
    const { data: users } = trpc.userRouter.getUser.useQuery();
  return (
    <div className="index">
<div className="div-2">
        <div className="overlap">
          <div className="rectangle-3" />
          <div className="text-wrapper-5">TradeSaga</div>
          <div className="overlap-group">
            <div className="overlap-2">
              <div className="rectangle-4" />
              <div className="home-stock-dashboard">
                Home
                <br />
                <br />
                <br />
                <br />
                Stock Dashboard
                <br />
                <br />
                <br />
                <br />
                News
              </div>
              <img
                className="house"
                alt="House"
                src="https://cdn.animaapp.com/projects/651c6168078b4bf0d795c193/releases/651c61d8976f97ae9a7a1ca5/img/house-2x-1@2x.png"
              />
            </div>
            <img
              className="rectangle-5"
              alt="Rectangle"
              src="https://cdn.animaapp.com/projects/651c6168078b4bf0d795c193/releases/651c61d8976f97ae9a7a1ca5/img/rectangle-3-1.png"
            />
            <img
              className="newspaper"
              alt="Newspaper"
              src="https://cdn.animaapp.com/projects/651c6168078b4bf0d795c193/releases/651c61d8976f97ae9a7a1ca5/img/newspaper-2x-1.png"
            />
          </div>
          <div className="help-settings">
            Help
            <br />
            <br />
            Settings
          </div>
          <img
            className="questionmark-circle"
            alt="Questionmark circle"
            src="https://cdn.animaapp.com/projects/651c6168078b4bf0d795c193/releases/651c61d8976f97ae9a7a1ca5/img/questionmark-circle-1.png"
          />
          <img
            className="gear-circle"
            alt="Gear circle"
            src="https://cdn.animaapp.com/projects/651c6168078b4bf0d795c193/releases/651c61d8976f97ae9a7a1ca5/img/gear-circle-1.png"
          />
          <div className="div-wrapper">
            <div className="text-wrapper-6">T</div>
          </div>
        </div>
        <div className="overlap-group-2">
          <div className="overlap-3">
            <div className="text-wrapper-7">Search for a stock...</div>
            <Magnifyingglass
              className="magnifyingglass-instance"
              magnifyingglassClassName="design-component-instance-node"
            />
          </div>
          <img
            className="element"
            alt="Element"
            src="https://cdn.animaapp.com/projects/651c6168078b4bf0d795c193/releases/651c61d8976f97ae9a7a1ca5/img/5035563-1.png"
          />
          <div className="rectangle-6" />
          <img
            className="group-2"
            alt="Group"
            src="https://cdn.animaapp.com/projects/651c6168078b4bf0d795c193/releases/651c61d8976f97ae9a7a1ca5/img/group-1@2x.png"
          />
          <div className="text-wrapper-8">TradeSaga Player</div>
        </div>
        <div className="text-wrapper-9">My Feed</div>
        <div className="overlap-4">
          <div className="text-wrapper-10">My Games</div>
          <div className="text-wrapper-11">+</div>
          <div className="component-2">
            <Component className="property-default" property1="default" />
            <Component className="property" property1="variant-2" />
            <Component className="property-variant" property1="variant-3" />
            <Component className="component-instance" property1="variant-4" />
          </div>
        </div>
        <div className="component-3">
          <PropertyDefaultWrapper className="component-1" property1="default" />
          <PropertyDefaultWrapper className="component-1-instance" property1="variant-2" />
        </div>
      </div>
    </div>
  );
}


const Magnifyingglass = ({ className, magnifyingglassClassName }) => {
  return (
    <div className={`magnifyingglass ${className}`}>
      <div className={`text-wrapper ${magnifyingglassClassName}`}>􀊫</div>
    </div>
  );
};

const Component = ({ property1, className }) => {
  return (
    <div className={`component ${className}`}>
      <div className="rectangle" />
      <div className="div">GAME #1</div>
      <img
        className="group"
        alt="Group"
        src="https://cdn.animaapp.com/projects/651c6168078b4bf0d795c193/releases/651c61d8976f97ae9a7a1ca5/img/group-2-2@2x.png"
      />
      <p className="element-place">
        <span className="span">
          1st place
          <br />
        </span>
        <span className="text-wrapper-2">&nbsp;&nbsp; +18.2%</span>
      </p>
    </div>
  );
};

Component.propTypes = {
  property1: PropTypes.oneOf(["variant-4", "variant-2", "variant-3", "default"]),
};

export const PropertyDefaultWrapper = ({ property1, className }) => {
  return (
    <div className={`property-default-wrapper ${className}`}>
      <img
        className="img"
        alt="Group"
        src="https://cdn.animaapp.com/projects/651c6168078b4bf0d795c193/releases/651c61d8976f97ae9a7a1ca5/img/group-1@2x.png"
      />
      <div className="rectangle-2" />
      <div className="text-wrapper-3">TradeSaga Player 2</div>
      <p className="liking-how-TSLA-is">
        Liking how TSLA is moving. Picking it up was a <br />
        great call!
      </p>
      <div className="text-wrapper-4">Today, 2pm</div>
    </div>
  );
};

PropertyDefaultWrapper.propTypes = {
  property1: PropTypes.oneOf(["variant-2", "default"]),
};
