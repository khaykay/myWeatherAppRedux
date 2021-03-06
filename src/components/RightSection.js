import { CircularProgress, Fab } from "@material-ui/core";
import React from "react";
import DayCard from "./DayCard";
import Highlight from "./Highlight";
import "./RightSection.scss";
import { useDispatch, useSelector } from "react-redux";
import { ChangeToCelsius, changeToFahrenheit } from "../features/TempUnitSlice";
import { closeSidebar } from "../features/SidebarToggleSlice";
var dateFormat = require("dateformat");

function RightSection() {
  const tempUnit = useSelector((state) => state.tempUnit.tempUnit);
  const dispatch = useDispatch();

  const { todayWeather, nextFiveDaysWeather } = useSelector(
    (state) => state.currentLocation
  );

  const renderFiveDaysWeather = (data) => {
    return data.map(
      ({ applicable_date, max_temp, min_temp, weather_state_abbr, id }) => {
        return (
          <DayCard
            key={id}
            day={dateFormat(applicable_date, "DDDD, mmmm d")}
            icon={`https://www.metaweather.com/static/img/weather/${weather_state_abbr}.svg`}
            maxTemp={max_temp}
            minTemp={min_temp}
          />
        );
      }
    );
  };

  return (
    <div onClick={() => dispatch(closeSidebar())} className="rightSection">
      <div className="rightSection__units">
        <Fab
          onClick={() => dispatch(changeToFahrenheit())}
          color={tempUnit === "fahrenheit" ? "primary" : "default"}
          size="small"
        >
          ℉
        </Fab>
        <Fab
          onClick={() => dispatch(ChangeToCelsius())}
          color={tempUnit === "celsius" ? "primary" : "default"}
          size="small"
        >
          ℃
        </Fab>
      </div>

      <div className="rightSection__days">
        {nextFiveDaysWeather ? (
          renderFiveDaysWeather(nextFiveDaysWeather)
        ) : (
          <CircularProgress />
        )}
      </div>

      <div className="rightSection__highlights">
        <h3>Today's Highlights</h3>

        <div className="rightSection__highlights--grid">
          <Highlight
            title="Wind Status"
            wind={todayWeather?.wind_speed}
            windDirection={todayWeather?.wind_direction}
          />
          <Highlight title="Humidity" humidity={todayWeather?.humidity} />
          <Highlight title="Visibility" visibility={todayWeather?.visibility} />
          <Highlight
            title="Air Pressure"
            airPressure={todayWeather?.air_pressure}
          />
        </div>
      </div>
    </div>
  );
}

export default RightSection;
