'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import {
  User,
  Key,
  Users,
  Puzzle,
  Copy,
  RefreshCcw,
  Eye,
  EyeOff,
  Check,
  Plus,
  Trash2,
  Github,
  Slack,
  Globe,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'api', label: 'API keys', icon: Key },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'integrations', label: 'Integrations', icon: Puzzle },
];

const teamMembers = [
  { name: 'Alex Rivera', email: 'alex@acme.com', role: 'Owner', avatar: 'alex', you: true },
  { name: 'Priya Nair', email: 'priya@acme.com', role: 'Admin', avatar: 'priya', you: false },
  { name: 'Tom Walsh', email: 'tom@acme.com', role: 'Member', avatar: 'tom', you: false },
];

const integrations = [
  {
    id: 'github',
    name: 'GitHub',
    description: 'Sync knowledge base from your repos and wikis.',
    icon: Github,
    connected: true,
    color: 'from-gray-600 to-gray-800',
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Route escalations and alerts to any channel.',
    icon: Slack,
    connected: true,
    color: 'from-purple-600 to-indigo-600',
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    description: 'Push qualified leads and conversation summaries to CRM.',
    icon: Globe,
    connected: false,
    color: 'from-orange-500 to-red-500',
  },
  {
    id: 'zendesk',
    name: 'Zendesk',
    description: 'Auto-create tickets for escalated conversations.',
    icon: Globe,
    connected: false,
    color: 'from-green-600 to-teal-600',
  },
];

const mockApiKey = 'bfai_sk_live_4xK9mNpQrTvWzYb2cHeJfLdAuXsG7o1';

function ProfileTab() {
  const [name, setName] = useState('Alex Rivera');
  const [email, setEmail] = useState('alex@acme.com');
  const [company, setCompany] = useState('Acme Corp');

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl border border-white/10 p-6">
        <h3 className="font-display text-lg text-white">Personal information</h3>
        <div className="mt-5 space-y-4">
          <div className="flex items-center gap-5">
            <div className="relative">
              <img
                src="https://api.dicebear.com/9.x/notionists/svg?seed=alex"
                alt=""
                className="h-16 w-16 rounded-2xl ring-2 ring-violet-500/30"
              />
              <button
                onClick={() => toast.success('Photo upload stub')}
                className="absolute -bottom-1 -right-1 grid h-6 w-6 place-items-center rounded-full bg-violet-500 text-white shadow-lg"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>
            <div>
              <div className="text-sm font-medium text-white">{name}</div>
              <button
                onClick={() => toast.success('Photo upload stub')}
                className="mt-1 text-xs text-violet-300 hover:text-violet-200"
              >
                Change photo
              </button>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Input
            label="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
          <Button onClick={() => toast.success('Profile saved')}>Save changes</Button>
        </div>
      </div>

      <div className="glass rounded-2xl border border-white/10 p-6">
        <h3 className="font-display text-lg text-white">Change password</h3>
        <div className="mt-5 space-y-4">
          <Input label="Current password" type="password" placeholder="••••••••" />
          <Input label="New password" type="password" placeholder="••••••••" hint="Minimum 12 characters." />
          <Input label="Confirm new password" type="password" placeholder="••••••••" />
          <Button onClick={() => toast.success('Password updated')}>Update password</Button>
        </div>
      </div>

      <div className="glass rounded-2xl border border-rose-500/20 p-6">
        <h3 className="font-display text-lg text-rose-300">Danger zone</h3>
        <p className="mt-2 text-sm text-white/60">
          Permanently delete your account and all associated data. This cannot be undone.
        </p>
        <button
          onClick={() => toast.error('Account deletion flow (stub)')}
          className="mt-4 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2.5 text-sm font-medium text-rose-300 transition hover:bg-rose-500/20"
        >
          Delete account
        </button>
      </div>
    </div>
  );
}

function ApiTab() {
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  function copyKey() {
    navigator.clipboard.writeText(mockApiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl border border-white/10 p-6">
        <h3 className="font-display text-lg text-white">Live API key</h3>
        <p className="mt-1 text-sm text-white/50">
          Keep this secret. It grants full access to your account via the API.
        </p>
        <div className="mt-5 flex items-center gap-2">
          <div className="flex flex-1 items-center gap-3 rounded-xl border border-white/10 bg-ink-900/60 px-4 py-3 font-mono text-sm">
            <span className="flex-1 text-white/80">
              {visible ? mockApiKey : mockApiKey.replace(/(?<=.{12}).(?=.{4})/g, '•')}
            </span>
            <button
              type="button"
              onClick={() => setVisible((v) => !v)}
              className="text-white/40 transition hover:text-white"
            >
              {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <button
            type="button"
            onClick={copyKey}
            className={cn(
              'grid h-11 w-11 place-items-center rounded-xl border transition',
              copied
                ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                : 'border-white/10 bg-white/[0.04] text-white/60 hover:bg-white/[0.08] hover:text-white',
            )}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={() => toast.success('API key rotated (stub)')}
            className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-white/60 transition hover:bg-white/[0.08] hover:text-white"
          >
            <RefreshCcw className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-3 text-xs text-white/40">
          Rotating generates a new key instantly. The old key stops working immediately.
        </p>
      </div>

      <div className="glass rounded-2xl border border-white/10 p-6">
        <h3 className="font-display text-lg text-white">Quick start</h3>
        <pre className="mt-4 overflow-x-auto rounded-xl border border-white/10 bg-ink-950 p-4 font-mono text-xs text-white/80">
{`curl https://api.altivora.ai/v1/chat \\
  -H "Authorization: Bearer ${visible ? mockApiKey : 'bfai_sk_live_••••••••••••'}" \\
  -H "Content-Type: application/json" \\
  -d '{"botId":"bot_support","message":"Hello"}'`}
        </pre>
      </div>
    </div>
  );
}

function TeamTab() {
  return (
    <div className="space-y-6">
      <div className="glass overflow-hidden rounded-2xl border border-white/10">
        <div className="flex items-center justify-between border-b border-white/5 p-6">
          <div>
            <h3 className="font-display text-lg text-white">Team members</h3>
            <p className="text-sm text-white/50">{teamMembers.length} members on Pro plan</p>
          </div>
          <button
            onClick={() => toast.success('Invite flow stub')}
            className="inline-flex items-center gap-2 rounded-xl border border-violet-500/40 bg-violet-500/10 px-4 py-2 text-sm text-violet-200 transition hover:bg-violet-500/20"
          >
            <Plus className="h-4 w-4" />
            Invite member
          </button>
        </div>
        <ul>
          {teamMembers.map((m) => (
            <li
              key={m.email}
              className="flex items-center justify-between border-b border-white/5 px-6 py-4 last:border-0"
            >
              <div className="flex items-center gap-3">
                <img
                  src={`https://api.dicebear.com/9.x/notionists/svg?seed=${m.avatar}`}
                  alt=""
                  className="h-9 w-9 rounded-full"
                />
                <div>
                  <div className="text-sm text-white">
                    {m.name}
                    {m.you && (
                      <span className="ml-2 rounded-full bg-white/5 px-1.5 py-0.5 text-[10px] text-white/40">
                        you
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-white/50">{m.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-xs text-white/70">
                  {m.role}
                </span>
                {!m.you && (
                  <button
                    onClick={() => toast.success('Remove member (stub)')}
                    className="rounded-lg p-1.5 text-white/30 transition hover:bg-rose-500/10 hover:text-rose-300"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function IntegrationsTab() {
  const [states, setStates] = useState<Record<string, boolean>>(
    Object.fromEntries(integrations.map((i) => [i.id, i.connected])),
  );

  function toggle(id: string) {
    const next = !states[id];
    setStates((s) => ({ ...s, [id]: next }));
    toast.success(next ? 'Integration connected (stub)' : 'Integration disconnected');
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {integrations.map((int) => (
        <div
          key={int.id}
          className="glass flex flex-col rounded-2xl border border-white/10 p-5 transition hover:border-white/20"
        >
          <div className="flex items-start justify-between">
            <div
              className={cn(
                'inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br',
                int.color,
              )}
            >
              <int.icon className="h-5 w-5 text-white" />
            </div>
            <button
              type="button"
              onClick={() => toggle(int.id)}
              className={cn(
                'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                states[int.id] ? 'bg-violet-500' : 'bg-white/10',
              )}
              role="switch"
              aria-checked={states[int.id]}
            >
              <span
                className={cn(
                  'inline-block h-4 w-4 rounded-full bg-white shadow transition-transform',
                  states[int.id] ? 'translate-x-6' : 'translate-x-1',
                )}
              />
            </button>
          </div>
          <div className="mt-4">
            <div className="font-display text-white">{int.name}</div>
            <p className="mt-1 text-sm text-white/60">{int.description}</p>
          </div>
          <div className="mt-4">
            <span
              className={cn(
                'text-xs',
                states[int.id] ? 'text-emerald-300' : 'text-white/40',
              )}
            >
              {states[int.id] ? '● Connected' : '○ Not connected'}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

const tabContent: Record<string, React.ReactNode> = {
  profile: <ProfileTab />,
  api: <ApiTab />,
  team: <TeamTab />,
  integrations: <IntegrationsTab />,
};

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-white sm:text-4xl">Settings</h1>
        <p className="mt-1 text-sm text-white/50">Manage your account, team, and integrations.</p>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.02] p-1.5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'inline-flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm transition',
              activeTab === tab.id
                ? 'bg-violet-500/20 text-violet-200'
                : 'text-white/55 hover:bg-white/[0.04] hover:text-white',
            )}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div>{tabContent[activeTab]}</div>
    </div>
  );
}
