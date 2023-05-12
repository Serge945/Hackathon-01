import PropTypes from "prop-types";

function Slider({ maxRange, defaultRange, unit, rangeValue, setRangeValue }) {
  return (
    <div className="sliderBox">
      <p className="textSlider">
        {rangeValue} {unit}
      </p>
      <input
        className="slider"
        type="range"
        min="1"
        max={maxRange}
        defaultValue={defaultRange}
        onChange={(e) => setRangeValue(e.target.value)}
      />
    </div>
  );
}

Slider.propTypes = {
  maxRange: PropTypes.number.isRequired,
  defaultRange: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
  rangeValue: PropTypes.number.isRequired,
  setRangeValue: PropTypes.func.isRequired,
};

export default Slider;
