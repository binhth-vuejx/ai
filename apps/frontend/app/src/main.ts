import { mount } from 'svelte';
import App from './App.svelte';
import './assets/index.css';

console.log('[Frontend] Starting application...');
console.log('[Frontend] Timestamp:', new Date().toISOString());
console.log('[Frontend] Environment:', import.meta.env.MODE);

const app = mount(App, {
  target: document.getElementById('app')!,
});

console.log('[Frontend] Application mounted successfully');

export default app;
