import './avatar.css';

function Avatar({ image, alt, width, className, style }) {
  return (
    <div className={`avatar ${className}`} style={style}>
      <img src={image} alt={alt} style={{ width: width, height: width }} />
    </div>
  );
}

export default Avatar;
