import React from "react";
import "./Footer.less";
import { Layout } from "antd";
import {
  FacebookFilled,
  Html5Filled,
  InstagramFilled,
  TwitterCircleFilled,
  YoutubeFilled,
} from "@ant-design/icons";
import { useLocation } from "react-router-dom";

const { Footer } = Layout;

export default function ChapyFooter() {
  const location = useLocation();
  const visible = !(
    location.pathname.match(/\/chat\/.+/g) ||
    location.pathname.includes("authorize-instagram")
  );

  return (
    visible && (
      <Footer className="footer-root">
        <div className="footer-social">
          <ul>
            <li>
              <FacebookFilled
                style={{
                  color: "#3b5998",
                }}
              />
            </li>
            <li>
              <a href="https://instagram.com/amirhosein_hshmt">
                <InstagramFilled
                  style={{
                    color: "#C32AA3",
                  }}
                />
              </a>
            </li>
            <li>
              <TwitterCircleFilled style={{ color: "#03A9F4" }} />
            </li>
            <li>
              <YoutubeFilled
                style={{
                  color: "red",
                }}
              />
            </li>
            <li>
              <Html5Filled />
            </li>
          </ul>
        </div>
        <div className="footer-links">
          <ul>
            <li>
              <a href="https://instagram.com/amirhosein_hshmt">About us</a>
            </li>
          </ul>
        </div>
        ©2020 Created by F8
      </Footer>
    )
  );
}
