import { VerseProvider } from "./VerseProvider";
import { StreakProvider } from "./StreakProvider";
import { GuessProvider } from "./DataProvider";

interface ProvidersProps {
    children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <div>
        <GuessProvider>
            <StreakProvider>
                <VerseProvider>
                    {children}
                </VerseProvider>
            </StreakProvider>    
        </GuessProvider>   
    </div>
  )
}

export default Providers