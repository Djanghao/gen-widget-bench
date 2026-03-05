import React from "react";
import { Wifi, Home, Thermometer, Lightbulb, Activity, Lock, Camera } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import data from "./data.json";

// Helper
function DeviceRow({ icon, label, status, statusStyle, eidLabel, eidStatus }) {
  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",margin:"4px 0"}} data-eid={eidLabel.replace("-status","")}>
      <span style={{display:"flex",alignItems:"center",fontSize:13,opacity:0.8}}>
        {icon}
        <span style={{marginLeft:6}}>{label}</span>
      </span>
      <span data-eid={eidStatus} style={Object.assign({
        fontSize:13,
        fontWeight:600,
        minWidth:68,
        textAlign:"right"
      }, statusStyle)}>{status}</span>
    </div>
  );
}

function RoomCard({room, idx}) {
  let accentColor, icon;
  switch(idx){
    case 0: accentColor="#f7ca3e"; icon=<Home size={18} color="#ced8fd" style={{verticalAlign:"middle"}}/>; break;
    case 1: accentColor="#f7ca3e"; icon=<Home size={18} color="#ced8fd" style={{verticalAlign:"middle"}}/>; break;
    case 2: accentColor="#f7ca3e"; icon=<Home size={18} color="#ced8fd" style={{verticalAlign:"middle"}}/>; break;
    case 3: accentColor="#f7ca3e"; icon=<Home size={18} color="#ced8fd" style={{verticalAlign:"middle"}}/>; break;
    default: accentColor="#f7ca3e"; icon=null;
  }
  // Icon per room (simulate different icons: Living/Bed - blue, Kitchen/Garage - yellow)
  let iconStyle={marginRight:5,color:"#2992fa"};
  if (room.name==="Kitchen"||room.name==="Garage") iconStyle.color="#f7ca3e";
  let headerIcon=<svg style={iconStyle} width="20" height="20" fill="none" viewBox="0 0 24 24">
    <rect width="24" height="24" rx="5" fill="none"/>
    <path d="M4 12L12 6l8 6" stroke={iconStyle.color} strokeWidth="2" fill="none"/>
    <rect x="7" y="13" width="10" height="7" rx="2" stroke={iconStyle.color} strokeWidth="2" fill="none"/>
  </svg>;

  // Energy bar: off-blue for activity (motion) or orange for warning, green for ok
  let energyBarColors = [
    "#71AAFF", "#FFB13F", "#43df79", "#43df79"
  ];
  let energyFill=room.energyBarFill;
  let energyColor=energyBarColors[idx];

  return (
    <div
      data-eid={`room-${idx}`}
      style={{
        flex:"1 1 0",margin:8,background:"rgba(36,41,86,1)",
        borderRadius:12,padding:16,minWidth:0,
        boxShadow:"0 0 0 1.5px #2a2d4b, 0 4px 18px 0 #15192d40"
      }}
    >
      <div style={{display:'flex',alignItems:'center',marginBottom:4}}>
        <span style={{fontSize:15,fontWeight:600, color:"#ced8fd"}} data-eid={`room-${idx}-name`}>
          {headerIcon}
          {room.name}
        </span>
      </div>
      <div style={{fontSize:15,fontWeight:700,marginBottom:2}}>
        <span data-eid={`room-${idx}-temp-current`} style={{color: accentColor, marginRight:5}}>{room.tempCurrent}</span>
        <span style={{color:"#6972a9", fontWeight:400,fontSize: 12}}>
          Target:{" "}
          <span data-eid={`room-${idx}-temp-target`}>{room.tempTarget}</span>
        </span>
      </div>
      <DeviceRow
        icon={<Lightbulb size={15} color="#f7ca3e" style={{verticalAlign:"middle"}}/>}
        label="Light"
        status={room.lightStatus}
        eidLabel={`room-${idx}-device-light`}
        eidStatus={`room-${idx}-device-light-status`}
        statusStyle={{
          color: room.lightStatus.match(/^On /)
            ? "#ffc13f" 
            : "#6972a9",
        }}
      />
      <DeviceRow
        icon={<Thermometer size={15} color="#4d6bf4" style={{verticalAlign:"middle"}}/>}
        label="Thermo"
        status={room.thermoStatus}
        eidLabel={`room-${idx}-device-thermostat`}
        eidStatus={`room-${idx}-device-thermostat-status`}
        statusStyle={{
          color: room.thermoStatus==="Cooling"
            ? "#4d6bf4"
            : "#aab4e0",
        }}
      />
      <DeviceRow
        icon={<Activity size={15} color="#43df79" style={{verticalAlign:"middle"}}/>}
        label="Sensor"
        status={room.sensorStatus}
        eidLabel={`room-${idx}-device-sensor`}
        eidStatus={`room-${idx}-device-sensor-status`}
        statusStyle={{
          color: room.sensorStatus==="Motion"
            ? "#71aaff"
            : room.sensorStatus==="Smoke OK"
              ? "#ffa940"
              : room.sensorStatus==="Door Closed"
                ? "#43df79"
                : room.sensorStatus==="No Motion"
                  ? "#43df79"
                  : "#aab4e0",
        }}
      />
      <div data-eid={`room-${idx}-energy-bar`} style={{marginTop:6, height:7, background:"#232859", borderRadius:5}}>
        <div data-eid={`room-${idx}-energy-bar-fill`}
          style={{
            height:7,
            width: energyFill,
            background: energyColor,
            borderRadius:6,
            transition: "width 250ms"
          }}
        />
      </div>
    </div>
  );
}

export default function Widget() {
  return (
    <section
      data-eid="root"
      style={{
        fontFamily:"Inter,Arial,sans-serif", 
        minWidth:430, 
        width:510, 
        borderRadius:"20px 20px 0 0",
        background:"linear-gradient(150deg, #181d3a 0%, #20244d 100%)",
        color:"#f6f7ff",
        boxShadow:"0 7px 32px #171b3f27",
        padding:"0 0 28px 0",
        margin: "0 auto",
        position: "relative"
      }}
    >
      {/* HEADER */}
      <header
        data-eid="header"
        style={{
          display:"flex",
          alignItems:"center",
          padding:"26px 0 12px 28px",
          gap:14
        }}
      >
        <div style={{display:"flex",alignItems:"center",fontSize:27,fontWeight:800,letterSpacing:"-1px"}} data-eid="title">
          <span style={{marginRight:13}}><Home size={23} color="#ced0ff"/></span>
          Smart Home
        </div>
        <span
          data-eid="home-name"
          style={{
            marginLeft:18,
            background:"rgba(94,105,207,1)",
            color:"#e0e5ff",
            fontWeight:600,
            borderRadius:8,
            padding:"3.5px 17px",
            fontSize:15,
          }}
        >Maple St.</span>
        <span data-eid="wifi-indicator" style={{marginLeft:8}}>
          <Wifi size={19} color="#53efb7"/>
        </span>
        <span
          data-eid="device-count"
          style={{
            marginLeft: -2,
            background: "rgba(48,82,41,0.98)",
            color: "#53efb7",
            fontWeight:600,
            borderRadius:8,
            fontSize:15,padding:"3.5px 17px"
          }}
        >24 devices</span>
      </header>

      {/* Rooms grid */}
      <div
        data-eid="rooms-grid"
        style={{
          display:"grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "auto auto",
          gap:0,
          padding:"0px 22px",
        }}
      >
        {[0,1,2,3].map(i=>
          <RoomCard key={i} idx={i} room={data.rooms[i]} />
        )}
      </div>

      {/* ENERGY SECTION */}
      <div
        data-eid="energy-section"
        style={{
          background:"rgba(42,44,85,0.98)",
          borderRadius:14,
          margin:"22px 22px 0 22px",
          padding:"18px 0 6px 0",
          boxShadow:"0 0 0 1px #25274d",
          }}
      >
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 22px 0 22px",marginBottom:7}}>
          <div data-eid="energy-title" style={{fontWeight:700,fontSize:17,letterSpacing:-0.5,color:"#ced8fd"}}>Daily Energy Usage</div>
          <div>
            <span data-eid="energy-cost-label" style={{fontSize:15,marginRight:5, color:"#7c8fd5"}}>This Week</span>
            <span data-eid="energy-cost-value" style={{fontWeight:700,fontSize:20,color:"#43df79"}}>{data.energyCost}</span>
          </div>
        </div>
        <div data-eid="energy-chart" style={{width:"100%",height:112,padding:"10px 6px 0 9px"}}>
          <ResponsiveContainer width="99%" height="95%">
            <BarChart
              data={data.energyChart}
              margin={{top:5,bottom:8,left:2,right:2}}>
              <YAxis
                domain={[0,50]}
                hide
              />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                stroke="#7c8fd5"
                style={{fill:"#949abf",fontWeight:500,fontSize:13}}
              />
              <Bar
                dataKey="value"
                fill="#6263c6"
                radius={[6,6,0,0]}
                barSize={28}
                background={false}
                />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* SECURITY SECTION */}
      <div
        data-eid="security-section"
        style={{
          margin: "21px 0 0 0",
          padding:"0 0 0 0"
        }}
      >
        <div style={{display:"flex",alignItems:"center",gap:7,padding:"0 22px 0 22px"}}>
          <div data-eid="security-title" style={{fontWeight:700,fontSize:17,letterSpacing:-0.5,color:"#ced8fd"}}>Security</div>
          <span data-eid="alarm-status"
            style={{
              marginLeft:"auto",
              marginRight:0,
              background:"rgba(48,82,41,0.97)",
              color:"#43df79",
              fontWeight:700,
              borderRadius:9,
              fontSize:15,padding:"4px 17px"
            }}
          >Armed - Away</span>
        </div>
        <div style={{display:"flex",gap:16,margin:"13px 22px 0 22px"}}>
          {data.cameras.map((cam,i)=>
            <div key={cam.name}
              data-eid={`camera-${i}`}
              style={{
                flex:"1 1 0",
                background:"#212642",
                borderRadius:10,
                padding:"15px 10px 9px 16px",
                minWidth:0,
                border: `1.4px solid ${i===2 ? "#792527" : "#212642"}`
              }}
            >
              <div style={{display:"flex",alignItems:"center",marginBottom:1}}>
                <Camera size={16} color={i===2?"#cc4259":"#43df79"} style={{marginRight:7}}/>
                <span data-eid={`camera-${i}-name`} style={{fontWeight:600,fontSize:14,color:"#e6e8fd",marginRight:7}}>
                  {cam.name}
                </span>
              </div>
              <span
                data-eid={`camera-${i}-status`}
                style={{
                  fontWeight:600,
                  fontSize:13,
                  color: cam.status==="Online" ? "#43df79" : "#e03a58"
                }}
              >{cam.status}</span>
            </div>
          )}
        </div>
      </div>
      
      {/* ENVIRONMENT */}
      <div
        data-eid="environment-section"
        style={{
          margin:"21px 0 0 0",
          padding:"0"
        }}
      >
        <div style={{display:"flex",alignItems:"center",gap:7,padding:"0 22px 0 22px"}}>
          <div data-eid="environment-title"
            style={{fontWeight:700,fontSize:17,letterSpacing:-0.5,color:"#ced8fd"}}>Environment</div>
        </div>
        <div style={{display:"flex",gap:16,margin:"13px 22px 0 22px"}}>
          {/* Indoor */}
          <div data-eid="env-indoor-temp" style={{flex:1,background:"#212642",borderRadius:10,padding:"9px 0 12px 0",textAlign:"center"}}>
            <span data-eid="env-indoor-temp-label" style={{color:"#8e96bb",fontWeight:600,fontSize:13}}>Indoor</span>
            <div data-eid="env-indoor-temp-value" style={{color:"#e0c543",fontWeight:700,fontSize:20,marginTop:2}}>71 F</div>
          </div>
          {/* Outdoor */}
          <div data-eid="env-outdoor-temp" style={{flex:1,background:"#212642",borderRadius:10,padding:"9px 0 12px 0",textAlign:"center"}}>
            <span data-eid="env-outdoor-temp-label" style={{color:"#8e96bb",fontWeight:600,fontSize:13}}>Outdoor</span>
            <div data-eid="env-outdoor-temp-value" style={{color:"#ffb13f",fontWeight:700,fontSize:20,marginTop:2}}>89 F</div>
          </div>
          {/* AQI */}
          <div data-eid="env-aqi" style={{flex:1,background:"#212642",borderRadius:10,padding:"9px 0 12px 0",textAlign:"center"}}>
            <span data-eid="env-aqi-label" style={{color:"#8e96bb",fontWeight:600,fontSize:13}}>AQI</span>
            <div data-eid="env-aqi-value" style={{color:"#37e47d",fontWeight:700,fontSize:20,marginTop:2}}>42 (Good)</div>
          </div>
          {/* Humidity */}
          <div data-eid="env-humidity" style={{flex:1,background:"#212642",borderRadius:10,padding:"9px 0 12px 0",textAlign:"center"}}>
            <span data-eid="env-humidity-label" style={{color:"#8e96bb",fontWeight:600,fontSize:13}}>Humidity</span>
            <div data-eid="env-humidity-value" style={{color:"#71aaff",fontWeight:700,fontSize:20,marginTop:2}}>52%</div>
          </div>
        </div>
      </div>
    </section>
  );
}