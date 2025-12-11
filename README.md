# StaticSend

> The missing backend for your static forms. Secure, reliable, and easy to setup form endpoints for developers.

StaticSend allows you to collect form submissions from your static websites without setting up a backend. It provides secure API endpoints, email notifications, and a dashboard to manage your forms and submissions.

## Features

- **Instant Setup**: Get your form endpoint in seconds. Copy, paste, and start collecting submissions immediately.
- **Form Control**: Enable or disable submissions instantly from your dashboard.
- **Email Notifications**: Receive real-time email alerts whenever someone submits your form.
- **Data Export**: Export your submissions to CSV or JSON format for easy analysis.
- **Spam Protection**: Built-in spam filtering to keep your inbox clean.
- **Developer Friendly**: Simple API integration compatible with any frontend framework or vanilla HTML.

## Technologies Used

### Frontend

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

### Backend

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

### Database

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

### Tools & Utilities

![NextAuth](https://img.shields.io/badge/NextAuth.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![Nodemailer](https://img.shields.io/badge/Nodemailer-0078D4?style=for-the-badge&logo=microsoft-outlook&logoColor=white)
![Lucide](https://img.shields.io/badge/Lucide-F05032?style=for-the-badge&logo=lucide&logoColor=white)

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB instance (Local or Atlas)

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/ShreyNagda/FormBridge.git
    cd FormBridge
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Set up environment variables**

    Create a `.env.local` file in the root directory and add the following variables:

    ```env
    MONGODB_URI=your_mongodb_connection_string
    NEXTAUTH_SECRET=your_nextauth_secret
    NEXTAUTH_URL=http://localhost:3000

    # Email Configuration (SMTP)
    SMTP_HOST=smtp.example.com
    SMTP_PORT=587
    SMTP_USER=your_email_user
    SMTP_PASS=your_email_password
    EMAIL_FROM=noreply@staticsend.com
    ```

4.  **Run the development server**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contribution

Contributions are welcome! Here's how you can contribute:

1.  **Fork the Project**
2.  **Create your Feature Branch** (`git checkout -b feature/AmazingFeature`)
3.  **Commit your Changes** (`git commit -m 'Add some AmazingFeature'`)
4.  **Push to the Branch** (`git push origin feature/AmazingFeature`)
5.  **Open a Pull Request**

## License

Distributed under the MIT License. See `LICENSE.md` for more information.

## Contact

- **Shrey Nagda** - [Portfolio](https://shreynagda.com)
- **LinkedIn**: [shreynagda](https://www.linkedin.com/in/shreynagda)
- **Project Link**: [https://github.com/ShreyNagda/FormBridge](https://github.com/ShreyNagda/FormBridge)
