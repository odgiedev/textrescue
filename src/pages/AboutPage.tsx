import NavBar from "../components/NavBar.tsx";
import Footer from "../components/Footer.tsx";
import Card from "../components/Card.tsx";

function AboutPage() {
    return (
        <>
            <NavBar />
            <div className="min-h-screen bg-sky-200 flex flex-col items-center text-black text-lg">
                <div className="w-2/3 text-center mt-8">
                    <h1 className="font-bold text-5xl text-sky-800">Text Rescue</h1>
                    <p className="mt-4 text-lg font-semibold">
                        Is a secure and efficient online platform designed for sharing and storing text snippets, code snippets, notes, and more.
                    </p>
                    <div className="mt-20 flex flex-col md:flex-row items-center justify-around">
                        <Card title="CLI" download={true}>
                            <div className="mt-4 flex flex-col text-gray-600">
                                {/*<span className="my-4 font-semibold text-red-400">Offline</span>*/}
                                <span className="font-semibold">Encrypt</span>
                                <span>text</span>
                                <span>file data</span>

                                <span className="mt-4 font-semibold">Decrypt</span>
                                <span>text</span>
                                <span>file data</span>
                                <span className="mt-4 font-semibold">Save raw text</span>
                                <span className="mt-4 font-semibold">Hash text</span>

                            </div>
                        </Card>

                        <Card title="WEB">
                            <div className="mt-4 flex flex-col text-gray-600">
                                {/*<span className="my-4 font-semibold text-blue-400">Online</span>*/}
                                <span className="mt-4 font-semibold">Account</span>
                                <span className="mt-4 font-semibold">Dashboard</span>
                                <span className="mt-4 font-semibold">Share</span>
                                <span className="mt-4 font-semibold">Search</span>
                                <span className="mt-4 font-semibold">Tags</span>
                                <span className="mt-4 font-semibold">Easy to use</span>
                            </div>
                        </Card>
                    </div>

                    <div className="my-20">
                        <h1 className="font-bold text-4xl text-sky-800 mb-10">Web</h1>

                        <p className="font-semibold">It offers a simple and convenient way to quickly save, share, and retrieve text-based information. Whether you're a developer sharing code snippets, a student taking notes, or anyone in need of a temporary text storage solution, Text Rescue has you covered.</p>
                    </div>

                    <img src="dashboard.png" alt="WEB" className="border-4 rounded-lg" />

                    <div className="my-20">
                        <h1 className="font-bold text-4xl text-sky-800 mb-10">CLI</h1>

                        <p className="font-semibold">The Text Rescue CLI is a powerful command-line tool that provides robust encryption capabilities for your text and file.</p>
                    </div>

                    <img src="terminal.png" alt="CLI" className="border-4 rounded-lg mb-20" />

                    <div className="my-20">
                        <h1 className="font-bold text-4xl text-sky-800 mb-10">Why Choose Text Rescue?</h1>

                        <p className="font-semibold">Text Rescue is for anyone in need of a simple and secure text sharing. With its user-friendly features and a commitment to privacy and security, Text Rescue ensures that your text is in safe hands, providing peace of mind for both personal and professional use.</p>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    )
}

export default AboutPage;