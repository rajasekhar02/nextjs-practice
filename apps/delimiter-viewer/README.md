# Project Title: LinkedIn Image Saver

## Purpose

To save images from any source, such as LinkedIn, to Notion for personal notes without having to download and upload them manually. This app allows you to save the images to Firebase Storage and add the Firebase URL to your Notion page.

## Libraries

- Formik: To handle the Form and related actions
- Jotai: To save the state when changing from one form stage to another
- Firebase Storage: To save the images
- TailwindCSS: For styling
- Next.js: Clientside rendering mode

## Current Functionality:

- Provides a form that can parse the delimited image URLs
    ![Image of above text](./screenshots/form%20with%20input.png)
- Provides a Gallery view of the Image URLs
    ![Image of above text](./screenshots/Gallery%20View.png)
- Can save the image to Firebase in path `image/<domain-name>/<path-name>.jpg`
    ![Image of above text](./screenshots/stored%20image%20in%20firebase.png)
- Can copy the Firebase URL to clipboard

## Planned Features:

- Add support for uploading multiple images at once.
- Improve UX experience by adding loading and notifications
- Improve Form Validation and Error Handling
- As the project is in a monorepo, extract Firebase functionality as a separate repo and use the same package for different projects.

## Helpful References

[Firebase/friendlyeats-web](https://github.com/firebase/friendlyeats-web)
[Firebase Javascript](https://firebase.google.com/docs/reference/js)
