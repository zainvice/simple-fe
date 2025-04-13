const extractSlideName = (fn) => {
    const fnString = fn.toString();
    const match = fnString.match(/handleVideoLoaded\("(.*?)"\)/); 
    return match ? match[1] : null; 
};

const originalSection = baseSections.find(
    (sec) => (sec.content.props.id === originalSectionName || extractSlideName(sec.content.props.onVideoLoaded) === originalSectionName)
);