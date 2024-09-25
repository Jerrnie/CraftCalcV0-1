export default function UserInput({ id, name, price, img, handleChange }) {

    function handleInternalChange(event) {
        let quantity = parseFloat(event.target.value);

        // if invalid quantity, set to 0
        if (quantity < 0 || quantity % 1 !== 0) {
            event.target.value = 0;
            quantity = 0;
            return;
        }
        handleChange(id, name, price, quantity); // Pass inputId and the value from the event
    }

    return (
        <div>
            <img src={`./${img}`} alt={`logo`} style={{ width: '35px', height: '35px', marginRight: '10px', marginTop: '10px' }} />
            <label htmlFor={id}>{name} <sup style={{ color: 'salmon' }}>x {price}</sup> </label>
            <input
                type="number"
                id={id}
                onChange={handleInternalChange}
            />
        </div>
    );
}
