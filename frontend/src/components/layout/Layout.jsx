import { Sidebar } from './Sidebar';
import { Header } from './Header';

export function Layout({ title, children }) {
  return (
    <div className="app-shell dark">
      <Sidebar />
      <div className="main-area">
        <Header title={title} />
        <div className="content surface-base">{children}</div>
      </div>
    </div>
  );
}
