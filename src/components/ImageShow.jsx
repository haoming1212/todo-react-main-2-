import {Empty} from "antd";

const ImageShow = (props) => {
  return (
    <div>
      {props.imageUrl && <img src={props.imageUrl} alt="Captured Image" style={{maxWidth: '100%'}}/>}
      {!props.imageUrl && <Empty/>}
    </div>
  )

}

export default ImageShow;
