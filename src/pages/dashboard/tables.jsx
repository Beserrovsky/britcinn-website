import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
} from "@material-tailwind/react";
import { brittTableData } from "@/data";
import { useState } from "react";
import { useEffect } from "react";

import { IconBulb, IconBulbOff, IconLockOpen, IconLock, IconBed } from "@tabler/icons";


export function Tables({publish, lightState, servoAngle}) {

  const [waiting, setWaiting] = useState(false);
  const [lastLightState, setLastLightState] = useState(null);
  const [lastServoAngle, setLastServoAngle] = useState(null);


  const toggleLight = () => {
    setWaiting(true);
    publish('light', JSON.stringify({
      light : !lightState.light_state
    }));
    setLastLightState(lightState.light_state);
  }

  const toggleLock = () => {
    setWaiting(true);
    publish('servo', JSON.stringify({
      angle : (servoAngle.servo_angle == 0? 90 : 0)
    }));
    setLastServoAngle(servoAngle.servo_angle);
  }

  useEffect(() => {
    const updateWaiting = () => {
      if (lightState != lastLightState || servoAngle != lastServoAngle) {
        setWaiting(false);
      }
    }
    updateWaiting();
  }, [lightState, servoAngle]);

  const getLightStyle = (item, waiting) => {
    if (item == null) { return 'bg-blue-gray-100 cursor-default'; }

    return item.light_state? 
      `bg-orange-500 cursor-${waiting? 'wait':'pointer'}` 
      : 
      `bg-blue-300 cursor-${waiting? 'wait':'pointer'}`;
  }

  const getLockStyle = (item, waiting) => {
    if (item == null) { return 'bg-blue-gray-100 cursor-default'; }

    return item.servo_angle == 90? 
      `bg-orange-500 cursor-${waiting? 'wait':'pointer'}`  
      :
      `bg-blue-300 cursor-${waiting? 'wait':'pointer'}`
      
  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Casa de Britney
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <img
              src={brittTableData.floorPlanImg}
              alt={"Floorplan image"}
              className="h-full w-full object-cover"
            />

            <div className={`${getLightStyle(lightState, waiting)} w-1/100 h-1/100 hidden lg:block absolute rounded-lg p-3`}
              style={{'top': '61%', 'left': '14%'}}
              onClick={()=>{if(!waiting) { toggleLight() } }}
            >
              {lightState != null && <Bulb state={lightState.light_state} />}
            </div>
          
            <div className={`${getLockStyle(servoAngle, waiting)} w-1/100 h-1/100 hidden lg:block absolute rounded-lg p-3`}
              style={{'top': '52%', 'left': '22%'}}
              onClick={()=>{if(!waiting) { toggleLock() } }}>
              {servoAngle != null && <Lock state={servoAngle.servo_angle == 90} />}
            </div>

            <div className="bg-deep-orange-200 w-1/100 h-1/100 lg:hidden absolute rounded-lg p-1"
              style={{'top': '65%', 'left': '11%'}}>
              <IconBed/>
            </div>
            
        </CardBody>
      </Card>
    </div>
  );
}

const Bulb = ({state}) => {
  return state? <IconBulb/> : <IconBulbOff/>
}

const Lock = ({state}) => {
  return state? <IconLock/> : <IconLockOpen/>
}


export default Tables;
