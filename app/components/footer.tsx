
export default function Footer() {
    return (
        <footer className="flex flex-col items-center justify-center w-full h-[100px] border-t sticky bottom-0">
            <p className="text-sm text-gray-500">
                © 2024 MyNotebook. All rights reserved.
            </p>
            <p>
                Created by <span className="font-bold">Kemuel John Budaca</span>
            </p>
            <p>
                Email: <span className="font-bold"><a href="mailto:kemueljohn73@gmail.com">kemueljohn73@gmail.com</a></span>
            </p>
        </footer>
    );
}