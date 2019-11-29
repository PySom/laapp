const useCounter = (type, value, creator) => {
    const onClick = () => creator();
    return { type, value, onClick }
}

export default useCounter;