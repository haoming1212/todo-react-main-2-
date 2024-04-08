import {useEffect} from "react";
import AMapLoader from "@amap/amap-jsapi-loader";

export default function MapContainer(props) {
  let map = null;
  console.log(props);

  useEffect(() => {
    AMapLoader.load({
      key: "0ed179af61205084209c9dd98335b93c", // 申请好的Web端开发者Key，首次调用 load 时必填
      version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
      .then((AMap) => {
        map = new AMap.Map("container", {
          // 设置地图容器id
          viewMode: "3D", // 是否为3D地图模式
          zoom: 11, // 初始化地图级别
          center: [props?.longitude, props?.latitude], // 初始化地图中心点位置
          // center: [116.3974, 39.90923], // 初始化地图中心点位置
        });
      })
      .catch((e) => {
        console.log(e);
      });

    return () => {
      map?.destroy();
    };
  }, [props.id]);

  return (
    <div>
      {props.longitude} + {props.latitude} + {props.id}
      <div
        id="container"
        style={{height: "900px", width: "900px"}}
      ></div>
    </div>
  );
}
