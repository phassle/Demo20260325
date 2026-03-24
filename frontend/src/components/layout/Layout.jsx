import { Sidebar } from './Sidebar';
import { Header } from './Header';

export function Layout({ title, children }) {
  return (
    <div class="app-shell">
      <Sidebar />
      <div class="main-area">
        <Header title={title} />
        <div class="content">{children}</div>
      </div>
    </div>
  );
}
