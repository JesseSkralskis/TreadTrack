import { getDistance } from "geolib";
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../context/trackContext";
import moment from "moment";

export default (id) => {
  const { state } = useContext(Context);
  const track = state.find((t) => t._id === id);

  

  //getsTotal distance
  const getTotalDistance = () => {
    const start = {
      latitude: track.locations[0].coords.latitude,
      longitude: track.locations[0].coords.longitude,
    };
    const end = {
      latitude: track.locations[track.locations.length - 1].coords.latitude,
      longitude: track.locations[track.locations.length - 1].coords.longitude,
    };
    const distance = getDistance(start, end, 1);
    const miles = distance / 1609.344;
    const kilometers = distance / 1000;
    return {
      miles: miles.toFixed(2),
      kilometers: kilometers.toFixed(2),
    };
  };
  //gets average speed
  const getAverageSpeed = () => {
    let total = 0;

    track.locations.map((interval) => {
      total += interval.coords.speed;
    });
    const milesPerHour = (total / track.locations.length) * 2.23694;
    const kph = (total / track.locations.length) * 3.6;

    return {
      avMph: milesPerHour.toFixed(2),
      avKph: kph.toFixed(2),
    };
  };
  //gets total time with the hours minutes seconds isolated
  //also start time and end time formatted
  const getTimes = () => {
    const startTime = moment
      .unix(track.locations[0].timestamp / 1000)
      .format("dddd,MMMM Do, YYYY h:mm:ss A");
    const endTime = moment
      .unix(track.locations[track.locations.length - 1].timestamp / 1000)
      .format("dddd,MMMM Do, YYYY h:mm:ss A");

    const totalTime =
      track.locations[track.locations.length - 1].timestamp -
      track.locations[0].timestamp;

    const formattedTime = new Date(totalTime).toISOString().substr(11, 8);

    const hours = formattedTime.substr(0, 2);
    const minutes = formattedTime.substr(3, 2);
    const seconds = formattedTime.substr(6, 2);

    return {
      totalTime: {
        hours,
        minutes,
        seconds,
      },
      startTime,
      endTime,
    };
  };
  const getHighLow = () => {
    let high = 0;
    let low = 200;
    track.locations.map((location) => {
      console.log(location.coords.speed);
      if (location.coords.speed > high) {
        high = location.coords.speed;
      }
      if (location.coords.speed < low) {
        low = location.coords.speed;
      }
    });
    return {
      mhigh: (high * 2.23694).toFixed(2),
      mlow: (low * 2.23694).toFixed(2),
      khigh: (high * 2.23694 * 1.60934).toFixed(2),
      klow: (low * 2.23694 * 1.60934).toFixed(2),
    };
  };
  const { mhigh, mlow, khigh, klow } = getHighLow();
  const { miles, kilometers } = getTotalDistance();
  const { startTime, endTime, totalTime } = getTimes();
  const { avMph, avKph } = getAverageSpeed();
  return [
    track,
    miles,
    kilometers,
    avMph,
    avKph,
    startTime,
    endTime,
    totalTime,
    mhigh,
    mlow,
    khigh,
    klow,
  ];
};
