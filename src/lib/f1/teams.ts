/**
 * Constructor brand colors for the standings rows.
 *
 * Best effort — team names come from the live Jolpica feed, so unknown
 * or renamed teams fall back to neutral gray instead of breaking.
 * Server-safe: plain data + pure function, importable anywhere.
 */

/** Constructor color per team name. */
const CONSTRUCTOR_COLORS: Record<string, string> = {
  McLaren: '#FF8000',
  Ferrari: '#E8002D',
  'Red Bull': '#3671C6',
  Mercedes: '#27F4D2',
  'Aston Martin': '#229971',
  Alpine: '#FF87BC',
  Williams: '#64C4FF',
  RB: '#6692FF',
  'Racing Bulls': '#6692FF',
  Sauber: '#52E252',
  Audi: '#C0C0C0',
  Haas: '#B6BABD',
  Cadillac: '#FF4FD8',
};

/** Team's brand color, or neutral gray when the feed names someone new. */
export function constructorColor(team: string): string {
  return CONSTRUCTOR_COLORS[team] ?? '#6b7280';
}
