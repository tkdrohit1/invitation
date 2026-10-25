"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  Utensils,
  Download,
  Search,
  Lock,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Trash2,
  Eye,
  EyeOff,
  RefreshCw,
  Heart,
} from "lucide-react";
import { RsvpSubmission, BlessingItem } from "@/lib/types";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [rsvps, setRsvps] = useState<RsvpSubmission[]>([]);
  const [blessings, setBlessings] = useState<BlessingItem[]>([]);
  const [stats, setStats] = useState({
    totalGuestsAttending: 0,
    confirmedRsvps: 0,
    declinedRsvps: 0,
    dietaryBreakdown: {} as Record<string, number>,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "yes" | "no">("all");
  const [isLoading, setIsLoading] = useState(false);

  // Authenticate (Default passcode: admin123)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "admin123" || passcode === "wedding2026") {
      setIsAuthenticated(true);
      setErrorMsg("");
      fetchData();
    } else {
      setErrorMsg("Incorrect passcode. Try 'admin123'");
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Fetch RSVPs
      const rsvpRes = await fetch("/api/rsvp");
      const rsvpData = await rsvpRes.json();
      if (rsvpData.success) {
        setRsvps(rsvpData.rsvps || []);
        setStats(rsvpData.stats || {});
      }

      // Fetch All Blessings (including unapproved)
      const blessRes = await fetch("/api/blessings?all=true");
      const blessData = await blessRes.json();
      if (blessData.success) {
        setBlessings(blessData.blessings || []);
      }
    } catch (e) {
      console.error("Failed to load dashboard data", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const handleToggleBlessing = async (id: string) => {
    try {
      await fetch("/api/blessings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action: "toggle" }),
      });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteBlessing = async (id: string) => {
    if (!confirm("Are you sure you want to remove this blessing?")) return;
    try {
      await fetch("/api/blessings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action: "delete" }),
      });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredRsvps = rsvps.filter((r) => {
    const matchesSearch =
      r.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.emailOrPhone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.dietaryNotes || "").toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filterStatus === "all" ? true : r.attending === filterStatus;

    return matchesSearch && matchesStatus;
  });

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#130205] px-6 text-white">
        <div className="w-full max-w-md rounded-3xl border border-[#e8c98a]/30 bg-gradient-to-b from-[#5c121e]/80 to-[#160306]/95 p-8 shadow-2xl backdrop-blur-xl">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#e8c98a]/40 bg-[#380a11] text-[#e8c98a] mb-4 mx-auto">
            <Lock className="h-5 w-5" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-center text-white mb-1">
            Organizer Portal
          </h2>
          <p className="font-serif text-xs text-center text-white/60 mb-6">
            Enter passcode to manage RSVPs, catering counts, and guestbook blessings.
          </p>

          {errorMsg && (
            <div className="mb-4 rounded-xl border border-red-500/40 bg-red-950/40 p-2.5 text-xs text-red-200 text-center">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Enter admin passcode (default: admin123)"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-[#e8c98a]"
            />
            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-[#e8c98a] to-[#d4b06a] py-3 text-xs font-bold uppercase tracking-wider text-[#1a1105] hover:brightness-110 transition shadow-md"
            >
              Unlock Dashboard
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-[#e8c98a]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Invitation</span>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#120204] text-white p-6 sm:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link
                href="/"
                className="text-xs text-[#e8c98a] hover:underline flex items-center gap-1"
              >
                <ArrowLeft className="h-3 w-3" /> Back to Invitation
              </Link>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white">
              Wedding Reception & RSVP Dashboard
            </h1>
            <p className="font-serif text-xs text-white/60">
              Live catering counts, guest attendance, and blessings moderation.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              disabled={isLoading}
              className="flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-xs font-medium text-white hover:bg-white/10 transition"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>

            <a
              href="/api/export"
              download
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#e8c98a] to-[#d4b06a] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#1a1105] shadow-md hover:brightness-110 transition"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download CSV (Catering)</span>
            </a>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-[#e8c98a]/30 bg-[#5c121e]/50 p-5 backdrop-blur-md">
            <div className="flex items-center justify-between text-[#e8c98a] mb-2">
              <span className="text-xs uppercase font-bold tracking-wider">Total Headcount</span>
              <Users className="h-5 w-5" />
            </div>
            <div className="font-heading text-3xl font-extrabold text-white">
              {stats.totalGuestsAttending}
            </div>
            <p className="text-[11px] text-white/50 mt-1">Confirmed guests attending</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
            <div className="flex items-center justify-between text-green-400 mb-2">
              <span className="text-xs uppercase font-bold tracking-wider">Accepted RSVPs</span>
              <CheckCircle className="h-5 w-5" />
            </div>
            <div className="font-heading text-3xl font-extrabold text-white">
              {stats.confirmedRsvps}
            </div>
            <p className="text-[11px] text-white/50 mt-1">Families / party groups attending</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
            <div className="flex items-center justify-between text-red-400 mb-2">
              <span className="text-xs uppercase font-bold tracking-wider">Declined</span>
              <XCircle className="h-5 w-5" />
            </div>
            <div className="font-heading text-3xl font-extrabold text-white">
              {stats.declinedRsvps}
            </div>
            <p className="text-[11px] text-white/50 mt-1">Sent warm regrets</p>
          </div>

          <div className="rounded-2xl border border-[#e8c98a]/20 bg-[#380a11]/60 p-5 backdrop-blur-md">
            <div className="flex items-center justify-between text-[#f5dfaa] mb-2">
              <span className="text-xs uppercase font-bold tracking-wider">Catering Diet Breakdown</span>
              <Utensils className="h-5 w-5" />
            </div>
            <div className="text-xs space-y-1 text-white/80 mt-1">
              {Object.entries(stats.dietaryBreakdown || {}).map(([key, count]) => (
                <div key={key} className="flex justify-between">
                  <span className="capitalize">{key}:</span>
                  <span className="font-bold text-[#e8c98a]">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RSVP Table Section */}
        <div className="rounded-3xl border border-white/10 bg-[#380a11]/40 p-6 backdrop-blur-md space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="font-heading text-xl font-bold text-white flex items-center gap-2">
              <span>Guest RSVPs</span>
              <span className="text-xs font-serif font-normal text-white/50">
                ({filteredRsvps.length} entries)
              </span>
            </h2>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-white/40" />
                <input
                  type="text"
                  placeholder="Search guest or notes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="rounded-xl border border-white/10 bg-black/40 pl-9 pr-4 py-2 text-xs text-white placeholder-white/30 outline-none focus:border-[#e8c98a]"
                />
              </div>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as "all" | "yes" | "no")}
                className="rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-xs text-white outline-none focus:border-[#e8c98a]"
              >
                <option value="all">All Statuses</option>
                <option value="yes">Attending Only</option>
                <option value="no">Declined Only</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-left text-xs text-white/80">
              <thead className="bg-[#1a0407] text-[#e8c98a] uppercase text-[10px] tracking-wider border-b border-white/10">
                <tr>
                  <th className="p-3.5">Guest Name</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Party Size</th>
                  <th className="p-3.5">Dietary</th>
                  <th className="p-3.5">Contact</th>
                  <th className="p-3.5">Message</th>
                  <th className="p-3.5">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredRsvps.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-6 text-center text-white/40">
                      No matching RSVP records found.
                    </td>
                  </tr>
                ) : (
                  filteredRsvps.map((rsvp) => (
                    <tr key={rsvp.id} className="hover:bg-white/[0.02]">
                      <td className="p-3.5 font-medium text-white">{rsvp.guestName}</td>
                      <td className="p-3.5">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                            rsvp.attending === "yes"
                              ? "bg-green-500/20 text-green-300 border border-green-500/30"
                              : "bg-red-500/20 text-red-300 border border-red-500/30"
                          }`}
                        >
                          {rsvp.attending === "yes" ? "Attending" : "Declined"}
                        </span>
                      </td>
                      <td className="p-3.5 font-bold text-[#e8c98a]">
                        {rsvp.attending === "yes" ? rsvp.guestCount : "-"}
                      </td>
                      <td className="p-3.5 capitalize">
                        {rsvp.attending === "yes" ? (
                          <div>
                            <span className="font-semibold text-white/90">
                              {rsvp.dietaryPreference}
                            </span>
                            {rsvp.dietaryNotes && (
                              <p className="text-[10px] text-white/50">{rsvp.dietaryNotes}</p>
                            )}
                          </div>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="p-3.5 font-mono text-[11px] text-white/60">
                        {rsvp.emailOrPhone || "-"}
                      </td>
                      <td className="p-3.5 max-w-xs truncate text-white/70 italic">
                        {rsvp.message ? `“${rsvp.message}”` : "-"}
                      </td>
                      <td className="p-3.5 text-white/40 text-[10px]">
                        {new Date(rsvp.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Blessings Moderation Section */}
        <div className="rounded-3xl border border-white/10 bg-[#380a11]/40 p-6 backdrop-blur-md space-y-4">
          <h2 className="font-heading text-xl font-bold text-white flex items-center gap-2">
            <span>Blessings Guestbook Moderation</span>
            <span className="text-xs font-serif font-normal text-white/50">
              ({blessings.length} total)
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {blessings.map((b) => (
              <div
                key={b.id}
                className="flex flex-col justify-between rounded-2xl border border-white/10 bg-black/40 p-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-[#e8c98a]">{b.authorName}</span>
                    <span className="text-[10px] text-white/40">{b.relation}</span>
                  </div>
                  <p className="font-serif italic text-xs text-white/80 mb-4 leading-relaxed">
                    “{b.message}”
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
                  <span
                    className={`text-[10px] uppercase font-bold ${
                      b.approved ? "text-green-400" : "text-amber-400"
                    }`}
                  >
                    {b.approved ? "Visible on Wall" : "Hidden"}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleBlessing(b.id)}
                      className="p-1.5 rounded-lg border border-white/10 hover:bg-white/10 transition text-white/70 hover:text-white"
                      title={b.approved ? "Hide from wall" : "Show on wall"}
                    >
                      {b.approved ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    </button>
                    <button
                      onClick={() => handleDeleteBlessing(b.id)}
                      className="p-1.5 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 transition"
                      title="Delete blessing"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
