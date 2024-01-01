const createFakeComments = async (formData) => {
    try {
        const response = await fetch("http://localhost:3000/create-fake-comments", {
            method: "post",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        return response.json()

    } catch (error) {
        throw new Error(`Failed to create fake comments: ${error.message}`)
    }
};

export { createFakeComments }
