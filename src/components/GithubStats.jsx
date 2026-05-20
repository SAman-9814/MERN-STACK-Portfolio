import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, animate } from 'framer-motion';
import TiltCard from './TiltCard';
import ScrollReveal3D from './ScrollReveal3D';
import WordReveal from './WordReveal';
import Magnetic from './Magnetic';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const FULL_MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

function getColor(count, isDark) {
    if (count === 0) return isDark ? '#1e1e2e' : '#ebedf0';
    if (count <= 3) return '#c77dff';
    if (count <= 6) return '#b820e6';
    if (count <= 9) return '#8e00b0';
    return '#6a0080';
}

function getEventIcon(type) {
    switch (type) {
        case 'PushEvent': return '📦';
        case 'PullRequestEvent': return '🔀';
        case 'IssuesEvent': return '🐛';
        case 'CreateEvent': return '✨';
        case 'ForkEvent': return '🍴';
        case 'WatchEvent': return '⭐';
        case 'DeleteEvent': return '🗑️';
        case 'IssueCommentEvent': return '💬';
        case 'PullRequestReviewEvent': return '👀';
        default: return '⚡';
    }
}

function formatEventTitle(event) {
    const repo = event.repo?.name || '';
    switch (event.type) {
        case 'PushEvent': {
            const commits = event.payload?.commits || [];
            const count = commits.length;
            return {
                title: `Pushed ${count} commit${count !== 1 ? 's' : ''} to ${repo}`,
                details: commits.map(c => c.message?.split('\n')[0]).filter(Boolean)
            };
        }
        case 'PullRequestEvent':
            return {
                title: `${event.payload?.action === 'opened' ? 'Opened' : 'Closed'} PR in ${repo}`,
                details: [event.payload?.pull_request?.title].filter(Boolean)
            };
        case 'IssuesEvent':
            return {
                title: `${event.payload?.action === 'opened' ? 'Opened' : 'Closed'} issue in ${repo}`,
                details: [event.payload?.issue?.title].filter(Boolean)
            };
        case 'CreateEvent':
            return {
                title: `Created ${event.payload?.ref_type} in ${repo}`,
                details: [event.payload?.ref].filter(Boolean)
            };
        case 'ForkEvent':
            return { title: `Forked ${repo}`, details: [] };
        case 'WatchEvent':
            return { title: `Starred ${repo}`, details: [] };
        case 'IssueCommentEvent':
            return { title: `Commented on issue in ${repo}`, details: [] };
        default:
            return { title: `Activity in ${repo}`, details: [] };
    }
}

/* Animated counter hook */
function useAnimatedCounter(target, duration = 1.6) {
    const [display, setDisplay] = useState(0);
    const prevTarget = useRef(0);
    useEffect(() => {
        if (target === 0) return;
        let start = prevTarget.current;
        prevTarget.current = target;
        const startTime = performance.now();
        const step = (now) => {
            const elapsed = (now - startTime) / (duration * 1000);
            const progress = Math.min(elapsed, 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(start + (target - start) * eased));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [target, duration]);
    return display;
}

export default function GithubStats() {
    const username = 'SAman-9814';
    const year = 2026;
    const [weeks, setWeeks] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [isDark, setIsDark] = useState(false);
    const [gridVisible, setGridVisible] = useState(false);

    // Selected day details
    const [selectedDay, setSelectedDay] = useState(null);
    const [events, setEvents] = useState([]);
    const [eventsLoading, setEventsLoading] = useState(false);
    const [allEvents, setAllEvents] = useState([]);

    // Animated counter
    const displayTotal = useAnimatedCounter(gridVisible ? total : 0, 1.8);

    useEffect(() => {
        setIsDark(document.documentElement.classList.contains('dark'));
        const observer = new MutationObserver(() => {
            setIsDark(document.documentElement.classList.contains('dark'));
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);

    // Prefetch GitHub events once
    useEffect(() => {
        fetch(`https://api.github.com/users/${username}/events/public?per_page=100`)
            .then(r => r.json())
            .then(data => Array.isArray(data) ? setAllEvents(data) : setAllEvents([]))
            .catch(() => setAllEvents([]));
    }, []);

    useEffect(() => {
        setLoading(true);
        setError(false);
        fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=${year}`)
            .then(res => res.json())
            .then(data => {
                const contributions = data.contributions || [];
                const dayMap = {};
                let totalCount = 0;
                contributions.forEach(d => {
                    dayMap[d.date] = d.count;
                    totalCount += d.count;
                });
                setTotal(totalCount);

                const startDate = new Date(`${year}-01-01`);
                const endDate = new Date(`${year}-12-31`);
                const weeksList = [];
                let current = new Date(startDate);
                const startDay = current.getDay();
                let week = [];
                for (let i = 0; i < startDay; i++) week.push(null);

                while (current <= endDate) {
                    const dateStr = current.toISOString().split('T')[0];
                    week.push({ date: dateStr, count: dayMap[dateStr] || 0 });
                    if (current.getDay() === 6) {
                        weeksList.push(week);
                        week = [];
                    }
                    current.setDate(current.getDate() + 1);
                }
                if (week.length > 0) {
                    while (week.length < 7) week.push(null);
                    weeksList.push(week);
                }

                setWeeks(weeksList);
                setLoading(false);
                // Small delay so the reveal animation triggers after render
                setTimeout(() => setGridVisible(true), 200);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    }, []);

    const handleDayClick = useCallback((day) => {
        if (!day) return;
        setSelectedDay(day);
        setEventsLoading(true);
        const dayEvents = allEvents.filter(e => {
            const eventDate = new Date(e.created_at).toISOString().split('T')[0];
            return eventDate === day.date;
        });
        setEvents(dayEvents);
        setEventsLoading(false);
    }, [allEvents]);

    // Build month label positions
    const monthLabels = [];
    if (weeks.length > 0) {
        let lastMonth = -1;
        weeks.forEach((week, wi) => {
            const firstValid = week.find(d => d !== null);
            if (firstValid) {
                const month = new Date(firstValid.date).getMonth();
                if (month !== lastMonth) {
                    monthLabels.push({ month, wi });
                    lastMonth = month;
                }
            }
        });
    }

    const cellSize = 13;
    const cellGap = 3;
    const step = cellSize + cellGap;
    const selectedDate = selectedDay ? new Date(selectedDay.date) : null;

    return (
        <div id="github" className="w-full px-[12%] py-10 scroll-mt-20 overflow-hidden">

            {/* ── Section Header ── */}
            <ScrollReveal3D>
                <div className="flex justify-center mb-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-300 dark:border-purple-500/40 bg-purple-50 dark:bg-purple-500/10">
                        <span className="w-2 h-2 rounded-full bg-[#b820e6] animate-pulse" />
                        <span className="text-xs font-semibold text-[#b820e6] font-Ovo tracking-widest uppercase">Open Source</span>
                    </div>
                </div>

                <h2 className="text-center text-5xl font-Ovo font-bold mb-4 shimmer-text flex justify-center">
                    <WordReveal text="GitHub Contributions" className="justify-center" />
                </h2>

                <div className="flex items-center justify-center gap-2 mb-5">
                    <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#b820e6]" />
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#b820e6] to-[#da7d20] animate-bounce" />
                    <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#da7d20]" />
                </div>

                <p className="text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo">
                    My coding activity and open source contributions in {year}. Click any cell to see details.
                </p>
            </ScrollReveal3D>

            {/* ── Contribution Grid Card ── */}
            <ScrollReveal3D delay={0.15}>
                <TiltCard
                    glowColor="rgba(184, 32, 230, 0.15)"
                    className="max-w-5xl mx-auto border border-gray-300 dark:border-white/20 rounded-2xl bg-white dark:bg-white/5 hover:shadow-lg transition-all duration-300"
                >
                    <div className="p-6">
                        {/* Header row */}
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-white font-Ovo">{year}</h3>

                            {/* Animated counter */}
                            {!loading && !error && (
                                <motion.span
                                    initial={{ opacity: 0, y: -8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4, duration: 0.5 }}
                                    className="text-sm text-gray-500 dark:text-white/60 font-Ovo tabular-nums"
                                >
                                    <span className="font-bold text-[#b820e6] text-base">{displayTotal.toLocaleString()}</span> contributions
                                </motion.span>
                            )}
                        </div>

                        {/* Loading skeleton */}
                        {loading && (
                            <div className="flex gap-1 overflow-hidden">
                                {Array.from({ length: 18 }).map((_, wi) => (
                                    <div key={wi} className="flex flex-col gap-1">
                                        {Array.from({ length: 7 }).map((_, di) => (
                                            <motion.div
                                                key={di}
                                                animate={{ opacity: [0.3, 0.7, 0.3] }}
                                                transition={{ duration: 1.4, repeat: Infinity, delay: (wi * 0.03) + (di * 0.02) }}
                                                style={{ width: cellSize, height: cellSize, borderRadius: 3 }}
                                                className="bg-gray-200 dark:bg-white/10"
                                            />
                                        ))}
                                    </div>
                                ))}
                            </div>
                        )}

                        {error && (
                            <div className="flex items-center justify-center h-32 text-gray-400 dark:text-white/40 font-Ovo">
                                Could not load contribution data.
                            </div>
                        )}

                        {!loading && !error && (
                            <div className="w-full overflow-x-auto">
                                <div className="flex gap-1 min-w-max">
                                    {/* Day labels */}
                                    <div className="flex flex-col gap-0 mr-1" style={{ paddingTop: 20 }}>
                                        {DAYS.map((day, i) => (
                                            <div key={i} style={{ height: step, lineHeight: `${step}px`, fontSize: 9, color: isDark ? 'rgba(255,255,255,0.4)' : '#888', width: 28, textAlign: 'right', paddingRight: 4 }}>
                                                {day}
                                            </div>
                                        ))}
                                    </div>

                                    <div>
                                        {/* Month labels — fade in */}
                                        <motion.div
                                            className="flex"
                                            style={{ height: 20 }}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: gridVisible ? 1 : 0 }}
                                            transition={{ duration: 0.6, delay: 0.3 }}
                                        >
                                            {weeks.map((_, wi) => {
                                                const label = monthLabels.find(m => m.wi === wi);
                                                return (
                                                    <div key={wi} style={{ width: step, fontSize: 10, color: isDark ? 'rgba(255,255,255,0.5)' : '#666', flexShrink: 0 }}>
                                                        {label ? MONTHS[label.month] : ''}
                                                    </div>
                                                );
                                            })}
                                        </motion.div>

                                        {/* Grid — staggered column reveal */}
                                        <div className="flex" style={{ gap: cellGap }}>
                                            {weeks.map((week, wi) => (
                                                <motion.div
                                                    key={wi}
                                                    className="flex flex-col"
                                                    style={{ gap: cellGap, transformOrigin: 'bottom' }}
                                                    initial={{ opacity: 0, scaleY: 0.4 }}
                                                    animate={gridVisible
                                                        ? { opacity: 1, scaleY: 1 }
                                                        : { opacity: 0, scaleY: 0.4 }
                                                    }
                                                    transition={{
                                                        duration: 0.35,
                                                        delay: wi * 0.012,
                                                        ease: [0.22, 1, 0.36, 1],
                                                    }}
                                                >
                                                    {week.map((day, di) => (
                                                        <motion.div
                                                            key={di}
                                                            title={day ? `${day.date}: ${day.count} contributions` : ''}
                                                            onClick={() => day && handleDayClick(day)}
                                                            whileHover={day ? { scale: 1.45, zIndex: 10 } : {}}
                                                            whileTap={day ? { scale: 0.9 } : {}}
                                                            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                                                            style={{
                                                                width: cellSize,
                                                                height: cellSize,
                                                                borderRadius: 3,
                                                                backgroundColor: day ? getColor(day.count, isDark) : 'transparent',
                                                                cursor: day ? 'pointer' : 'default',
                                                                outline: (selectedDay && day && selectedDay.date === day.date) ? '2px solid #b820e6' : 'none',
                                                                outlineOffset: 1,
                                                                flexShrink: 0,
                                                            }}
                                                        />
                                                    ))}
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Legend */}
                                <motion.div
                                    className="flex items-center gap-1.5 mt-4 justify-end"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={gridVisible ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.5, delay: 0.8 }}
                                >
                                    <span className="text-xs text-gray-500 dark:text-white/50 font-Ovo">Less</span>
                                    {[0, 3, 6, 9, 12].map((c, i) => (
                                        <motion.div
                                            key={c}
                                            initial={{ scale: 0 }}
                                            animate={gridVisible ? { scale: 1 } : {}}
                                            transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.8 + i * 0.06 }}
                                            style={{ width: cellSize, height: cellSize, borderRadius: 3, backgroundColor: getColor(c, isDark) }}
                                        />
                                    ))}
                                    <span className="text-xs text-gray-500 dark:text-white/50 font-Ovo">More</span>
                                </motion.div>
                            </div>
                        )}

                        {/* ── Activity Details Panel with AnimatePresence ── */}
                        <AnimatePresence mode="wait">
                            {selectedDay && (
                                <motion.div
                                    key={selectedDay.date}
                                    initial={{ opacity: 0, y: 20, height: 0 }}
                                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                                    exit={{ opacity: 0, y: -12, height: 0 }}
                                    transition={{ type: 'spring', damping: 24, stiffness: 200 }}
                                    className="overflow-hidden"
                                >
                                    <div className="mt-6 border-t border-gray-200 dark:border-white/10 pt-5">
                                        <div className="flex items-center justify-between mb-4">
                                            <motion.div
                                                initial={{ opacity: 0, x: -12 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.1 }}
                                            >
                                                <h4 className="font-semibold text-gray-800 dark:text-white font-Ovo text-base">
                                                    {selectedDate && `${FULL_MONTHS[selectedDate.getMonth()]} ${selectedDate.getDate()}, ${selectedDate.getFullYear()}`}
                                                </h4>
                                                <p className="text-sm text-gray-500 dark:text-white/50 font-Ovo mt-0.5">
                                                    {selectedDay.count} contribution{selectedDay.count !== 1 ? 's' : ''} on this day
                                                </p>
                                            </motion.div>
                                            <motion.button
                                                onClick={() => setSelectedDay(null)}
                                                whileHover={{ scale: 1.2, rotate: 90 }}
                                                whileTap={{ scale: 0.9 }}
                                                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                                className="text-gray-400 hover:text-gray-600 dark:hover:text-white text-xl leading-none transition-colors"
                                            >
                                                ✕
                                            </motion.button>
                                        </div>

                                        {selectedDay.count === 0 && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="flex flex-col items-center justify-center py-6 text-gray-400 dark:text-white/30 font-Ovo text-sm"
                                            >
                                                <span className="text-3xl mb-2">😴</span>
                                                No contributions on this day.
                                            </motion.div>
                                        )}

                                        {selectedDay.count > 0 && eventsLoading && (
                                            <div className="text-gray-400 dark:text-white/40 text-sm font-Ovo py-4 text-center">
                                                Loading activity...
                                            </div>
                                        )}

                                        {selectedDay.count > 0 && !eventsLoading && events.length === 0 && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="flex flex-col items-center gap-2 py-4"
                                            >
                                                <p className="text-sm text-gray-500 dark:text-white/50 font-Ovo text-center">
                                                    {selectedDay.count} contribution{selectedDay.count !== 1 ? 's' : ''} recorded.
                                                </p>
                                                <a
                                                    href={`https://github.com/${username}?tab=overview&from=${selectedDay.date}&to=${selectedDay.date}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-xs px-4 py-1.5 bg-gradient-to-r from-[#b820e6] to-[#da7d20] text-white rounded-full hover:opacity-90 transition font-Ovo"
                                                >
                                                    View on GitHub →
                                                </a>
                                                <p className="text-xs text-gray-400 dark:text-white/30 font-Ovo mt-1">
                                                    Detailed event data is only available for the last 90 days via GitHub API.
                                                </p>
                                            </motion.div>
                                        )}

                                        {selectedDay.count > 0 && !eventsLoading && events.length > 0 && (
                                            <div className="flex flex-col gap-3">
                                                {events.map((event, i) => {
                                                    const { title, details } = formatEventTitle(event);
                                                    const icon = getEventIcon(event.type);
                                                    return (
                                                        <motion.div
                                                            key={i}
                                                            initial={{ opacity: 0, x: -16 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: i * 0.07, type: 'spring', stiffness: 260, damping: 22 }}
                                                            className="flex gap-3 p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:border-[#b820e6]/40 transition-colors"
                                                        >
                                                            <span className="text-xl mt-0.5">{icon}</span>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-sm font-medium text-gray-800 dark:text-white font-Ovo truncate">{title}</p>
                                                                {details.map((d, j) => (
                                                                    <p key={j} className="text-xs text-gray-500 dark:text-white/50 mt-0.5 truncate font-Ovo">• {d}</p>
                                                                ))}
                                                            </div>
                                                            <a
                                                                href={`https://github.com/${event.repo?.name}`}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="text-xs text-[#b820e6] hover:underline font-Ovo self-start whitespace-nowrap"
                                                            >
                                                                View →
                                                            </a>
                                                        </motion.div>
                                                    );
                                                })}
                                                <a
                                                    href={`https://github.com/${username}?tab=overview&from=${selectedDay.date}&to=${selectedDay.date}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-xs text-center text-[#b820e6] hover:underline font-Ovo mt-1"
                                                >
                                                    View full activity on GitHub →
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </TiltCard>
            </ScrollReveal3D>

            {/* ── View GitHub Profile Button ── */}
            <ScrollReveal3D delay={0.3}>
                <div className="flex justify-center mt-12">
                    <Magnetic range={0.2}>
                        <motion.a
                            href={`https://github.com/${username}`}
                            target="_blank"
                            rel="noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            className="w-max flex items-center justify-center gap-2 text-gray-700 border border-gray-300 dark:border-white/25 hover:bg-slate-100/70 dark:hover:bg-darkHover rounded-full py-3 px-10 duration-300 dark:text-white font-Ovo transition-colors"
                        >
                            View GitHub Profile
                            <img src="./assets/right-arrow-bold.png" alt="" className="w-4 dark:hidden" />
                            <img src="./assets/right-arrow-bold-dark.png" alt="" className="w-4 hidden dark:block" />
                        </motion.a>
                    </Magnetic>
                </div>
            </ScrollReveal3D>
        </div>
    );
}
