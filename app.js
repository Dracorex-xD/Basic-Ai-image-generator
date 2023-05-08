import APIKey from './env.js';
const submit = document.querySelector('#submit-icon');
const input = document.querySelector('input');
const imgSection = document.querySelector('.images-section');

const getImages = async () => {
    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${APIKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prompt: input.value,
            n: 4,
            size: '1024x1024',
        }),
    }
    try {
        const res = await fetch('https://api.openai.com/v1/images/generations', options);
        const data = await res.json();
        console.log(data);

        data?.data.forEach(pic => {
            const imgContainer = document.createElement('div');
            imgContainer.classList.add('img-container');
            const imgElement = document.createElement('img');
            imgElement.setAttribute('src', pic.url);
            imgContainer.appendChild(imgElement);
            imgSection.appendChild(imgContainer);
        }); 
    } catch (error) {
        console.error(error);
    }
}

submit.addEventListener('click', getImages);