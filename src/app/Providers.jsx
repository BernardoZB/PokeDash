import { TeamProvider } from '../features/team/TeamContext';

export function Providers({ children }) {
  return <TeamProvider>{children}</TeamProvider>;
}
