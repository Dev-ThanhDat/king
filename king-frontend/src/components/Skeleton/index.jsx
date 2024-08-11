const Skeleton = ({ className, height, width, radius }) => {
  return (
    <div
      className={`skeleton ${className}`}
      style={{
        height: height,
        width: width || '100%',
        borderRadius: radius
      }}
    ></div>
  );
};

export default Skeleton;
