export type Status = 'healthy' | 'degraded' | 'down';
export type Service = { id: string; name: string; team: string; status: Status; latencyMs: number; uptime: number; note: string };
// Fabricated values, intentionally static: never real customer or infrastructure data.
export const demoServices: Service[] = [
  {id:'api',name:'API gateway',team:'Platform',status:'healthy',latencyMs:82,uptime:99.97,note:'Requests flowing normally.'},
  {id:'search',name:'Document search',team:'AI systems',status:'degraded',latencyMs:432,uptime:98.42,note:'Synthetic indexing delay under investigation.'},
  {id:'jobs',name:'Background jobs',team:'Platform',status:'healthy',latencyMs:126,uptime:99.91,note:'Queue operating normally.'},
  {id:'warehouse',name:'Analytics warehouse',team:'Data',status:'down',latencyMs:0,uptime:94.37,note:'Synthetic connection interruption.'},
  {id:'notifications',name:'Notifications',team:'Product',status:'healthy',latencyMs:109,uptime:99.95,note:'Delivery service operating normally.'},
];
export function filterServices(services: Service[], query: string, status: Status | 'all'): Service[] {
  const term = query.trim().toLocaleLowerCase();
  return services.filter(s => (status === 'all' || s.status === status) && `${s.name} ${s.team}`.toLocaleLowerCase().includes(term));
}
export function summarize(services: Service[]) {
  return {total: services.length, healthy: services.filter(s=>s.status==='healthy').length, incidents: services.filter(s=>s.status!=='healthy').length};
}
