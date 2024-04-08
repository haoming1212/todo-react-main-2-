import {useEffect, useState} from "react";
import {getRandom} from "../services/BasicApi.js";
import {Button, Descriptions, Image, Modal} from "antd";
import DescriptionsItem from "antd/es/descriptions/Item.js";

const NewsCard = () => {

  const [data, setData] = useState(null);
  const [show, setShow] = useState(false);

  const loadData = async () => {
    const res = await getRandom();
    console.log(res);
    setData(res?.data?.data)
  }

  useEffect(() => {
    loadData();
  }, []);

  return (<div>
    <div>
      <button
        type="button"
        className="btn"
        onClick={() => {
          setShow(true)
        }}
      >
        Random Quotes
      </button>
    </div>
    <div>
      {show && <div>
        <Modal open={show} onCancel={() => {
          setShow(false)
        }} onOk={() => {
          setShow(false)
        }} style={{padding: 50}}>


          <Descriptions title="User Info" layout={"vertical"}>
            <Descriptions.Item label="name" span={24}>{data?.name}</Descriptions.Item>
            <Descriptions.Item label="tag" span={24}>{data?.tag}</Descriptions.Item>
            <Descriptions.Item label="content" span={24}>{data?.content}</Descriptions.Item>
          </Descriptions>
        </Modal>
      </div>}
    </div>
  </div>)
};


export default NewsCard;
