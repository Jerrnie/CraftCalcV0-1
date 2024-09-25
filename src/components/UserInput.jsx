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
        <div id="user-input">
            <div className="input-group">
                <img
                    src={`./${img}`}
                    style={{ width: "30px", height: "30px" }}
                    alt={`${name} logo`}
                    className="user-input-img"
                />
                <label htmlFor={id}>
                    {name} <sup> x {price}</sup>
                </label>
                <input
                    type="number"
                    id={id}
                    onChange={handleInternalChange}
                    className="user-input-field"
                />
            </div>
        </div>
    );
}
