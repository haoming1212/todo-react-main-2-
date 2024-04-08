import {useEffect, useState} from "react";
import {Button, Image, Modal} from "antd";

const ImageCard = () => {

  const [show, setShow] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    setImage("https://cdn.seovx.com/?mom=302");

  }, []);

  return (
    <div>
      <div>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setShow(true)
          }}
        >
          Random Image
        </button>
      </div>
      <div>
        {
          show && <div>
            <Modal open={show} onCancel={() => {
              setShow(false)
            }} onOk={() => {
              setShow(false)
            }}>
              <Image src={image}></Image>
            </Modal>
            {/*<Image src={"https://www.dmoe.cc/random.php"}></Image>*/}

          </div>
        }
      </div>
    </div>
  )
};


export default ImageCard;
