import React from "react";

import "./Transactions.less";
import Avatar from "antd/es/avatar";
import Space from "antd/es/space";
import Table from "antd/es/table";

import { DownCircleTwoTone, UpCircleTwoTone } from "@ant-design/icons";

const Transactions = (props) => {
  const { transactions } = props;
  let sortedInfo = null;
  let filteredInfo = null;
  sortedInfo = sortedInfo || {};
  filteredInfo = filteredInfo || {};
  const columns = [
    {
      title: "Name",
      dataIndex: "user",
      key: "full_name",
      filters: [
        { text: "London", value: "London" },
        { text: "New York", value: "New York" },
      ],
      filteredValue: filteredInfo.address || null,
      onFilter: (value, record) => record.address.includes(value),
      render: (user) => (
        <Space>
          <Avatar size="large" src={user.avatar} />
          <span>{user.full_name}</span>
        </Space>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      sorter: (a, b) => a.amount < b.amount,
      // sortOrder: sortedInfo.columnKey === "address" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "Is Spent",
      dataIndex: "is_spent",
      key: "isSpent",
      render: (isSpent) => {
        return isSpent ? (
          <DownCircleTwoTone twoToneColor="red" />
        ) : (
          <UpCircleTwoTone twoToneColor="green" />
        );
      },
    },
    {
      title: "Created On",
      dataIndex: "created",
      key: "created",
      sorter: (a, b) => a.created < b.created,
      // sortOrder: sortedInfo.columnKey === "address" && sortedInfo.order,
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={transactions}
      onChange={(e) => console.log("chasnnngeeddd", e)}
    />
  );
};

export default Transactions;
