import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { Terminal } from "lucide-react";

declare global {
  interface Window {
    kakao: any;
  }
}

interface IpInfoType {
  city: string;
  region: string;
  country: string;
  ip_addr: string;
  latitude: string;
  longitude: string;
}

export default function Home() {
  const [ipInfo, setIpInfo] = useState<IpInfoType>();

  useEffect(() => {
    // DOM을 이용하여 script 태그를 만들어주자.
    const mapScript = document.createElement("script");
    // script.async = true 라면,
    // 해당 스크립트가 다른 페이지와는 비동기적으로 동작함을 의미한다.
    mapScript.async = true;
    // script.src에 map을 불러오는 api를 넣어주자.
    // 여기에서 우리가 기존에 발급 받았던 apiKey를 넣어주면 된다.
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=700d399006256f95732f06b19c046ba5&autoload=false`;

    //이제 우리가 만든 script를 document에 붙여주자.
    document.head.appendChild(mapScript);

    // script가 완전히 load 된 이후, 실행될 함수
    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        // const mapContainer = document.getElementById("map");
        // const mapOption = {
        //   center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        //   level: 3, // 지도의 확대 레벨
        // };
        // new window.kakao.maps.Map(mapContainer, mapOption);

        fetch("https://geolocation-api-by-kmk.cpro95.workers.dev")
          .then((r) => r.json())
          .then((ipInfo) => {
            setIpInfo(ipInfo);
            var container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
            var options = {
              //지도를 생성할 때 필요한 기본 옵션
              center: new window.kakao.maps.LatLng(
                ipInfo?.latitude,
                ipInfo?.longitude
              ), //지도의 중심좌표.
              level: 11, //지도의 레벨(확대, 축소 정도)
            };

            var map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
            var iwContent = `<div style="padding-top:5px;padding-bottom:5px;padding-left:30px;">You're Here!</div>`; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
            var iwPosition = new window.kakao.maps.LatLng(
              ipInfo?.latitude,
              ipInfo?.longitude
            ); //인포윈도우 표시 위치입니다
            var iwRemoveable = false; // removeable 속성을 true 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

            // 인포윈도우를 생성하고 지도에 표시합니다
            var infowindow = new window.kakao.maps.InfoWindow({
              map: map, // 인포윈도우가 표시될 지도
              position: iwPosition,
              content: iwContent,
              removable: iwRemoveable,
            });
          });
      });
    };

    // sciprt가 완전히 load 된 이후, 지도를 띄우는 코드를 실행시킨다.
    mapScript.addEventListener("load", onLoadKakaoMap);
  }, []);

  // console.log(ipInfo);
  return (
    <main className="w-full flex flex-col items-center justify-center pt-4">
      <Alert className="mb-2">
        <Terminal className="h-4 w-4" />
        <AlertTitle className="tracking-tighter sm:tracking-tight md:tracking-normal">
          {ipInfo?.ip_addr}
        </AlertTitle>
        <AlertDescription className="text-muted-foreground">
          {ipInfo?.city} / {ipInfo?.region} / {ipInfo?.country}
        </AlertDescription>
      </Alert>

      <div className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh]">
        <div id="map" style={{ width: "100%", height: "100%" }}></div>
      </div>
    </main>
  );
}
