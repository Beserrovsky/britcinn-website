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


export function Tables({lightState, servoAngle}) {

  const toggleLight = () => {

  }

  const toggleLock = () => {
    
  }

  const getLightColor = (item) => {
    if (item == null) { return 'bg-blue-gray-100';} 
    return item.light_state? 'bg-orange-500' : 'bg-blue-gray-100';
  }

  const getLockColor = (item) => {
    if (item == null) { return 'bg-blue-gray-100';} 
    return item.light_state? 'bg-blue-gray-300' : 'bg-blue-gray-300';
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

            <div className={`${getLightColor(lightState)} w-1/100 h-1/100 hidden lg:block absolute rounded-lg p-3 cursor-pointer`}
              style={{'top': '61%', 'left': '14%'}}
              onClick={()=>toggleLight}
            >
              {lightState != null && <Bulb state={lightState.light_state} />}
            </div>
          
            <div className={`${getLockColor(servoAngle)} w-1/100 h-1/100 hidden lg:block absolute rounded-lg p-3 cursor-pointer`}
              style={{'top': '52%', 'left': '22%'}}
              onClick={()=>toggleLock}>
              {servoAngle != null && <Lock state={servoAngle.servo_angle == 0} />}
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
  return state? <IconLockOpen/> : <IconLock/>
}


export default Tables;
