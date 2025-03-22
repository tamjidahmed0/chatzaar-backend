

let count = 0;

const healthController = (req, res) => {
    count += 10;
    res.status(200).send(`Server is up and running ${count} minutes`)

}

export default healthController