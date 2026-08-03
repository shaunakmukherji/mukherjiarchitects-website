import React, { useEffect } from 'react';
import { useNavigation } from '../../contexts/NavigationContext';
import { TEAM_MEMBERS } from '../../generated/teamImages';
import { ArrowLeft } from 'lucide-react';
import OptimizedImage from '../ui/OptimizedImage';
import { encodeImageUrl } from '../../lib/imageUrl';
import { applySEO, breadcrumb } from '../../lib/seo';

const TeamMemberDetail: React.FC = () => {
  const { selectedId, navigateBack, backLabel } = useNavigation();
  const member = TEAM_MEMBERS.find((m) => m.slug === selectedId);

  useEffect(() => {
    if (!member) return;
    const title = `${member.name} — ${member.role} | Mukherji Architects Milano`;
    const description = member.description
      ? `${member.description.slice(0, 150)}${member.description.length > 150 ? '...' : ''}`
      : `${member.name}, ${member.role} at Mukherji Architects Milano.`;
    return applySEO({
      title,
      description,
      image: member.headshotUrl,
      canonicalPath: `/the-studio/people/${member.slug}`,
      schemas: [breadcrumb(member.name, `/the-studio/people/${member.slug}`)],
    });
  }, [member]);

  if (!member) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <button
            onClick={navigateBack}
            className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm uppercase tracking-widest"
          >
            <ArrowLeft size={16} /> {backLabel}
          </button>
        </div>
      </div>
    );
  }

  const paragraphs = (member.description ?? '').split(/\n\n+/).filter(Boolean);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <button
          onClick={navigateBack}
          className="flex items-center gap-2 text-zinc-500 hover:text-white mb-16 transition-colors text-sm uppercase tracking-widest"
        >
          <ArrowLeft size={16} /> {backLabel}
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
          <div className="md:col-span-5 order-2 md:order-1">
            <div className="aspect-[3/4] w-full overflow-hidden bg-zinc-900">
              {member.headshotUrl && (
                <OptimizedImage
                  src={encodeImageUrl(member.headshotUrl)}
                  alt={member.name}
                  priority
                  lazy={false}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>

          <div className="md:col-span-7 order-1 md:order-2">
            <div className="max-w-2xl">
              <p className="text-zinc-600 text-xs uppercase tracking-[0.2em] mb-3">Mukherji Architects Milano</p>
              <h1 className="font-display text-5xl md:text-6xl font-bold text-white uppercase tracking-tight mb-3">
                {member.name}
              </h1>
              <p className="text-zinc-400 text-lg uppercase tracking-wide mb-8">
                {member.role}
              </p>

              {paragraphs.length > 0 && (
                <div className="space-y-5 max-w-prose">
                  {paragraphs.map((p, i) => (
                    <p key={i} className="text-zinc-400 text-base md:text-lg leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberDetail;
