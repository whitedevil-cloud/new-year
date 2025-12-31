import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

function FireworksCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let fireworks = [];

    class Firework {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.particles = Array.from({ length: 50 }).map(() => ({
          x,
          y,
          angle: Math.random() * Math.PI * 2,
          speed: Math.random() * 4 + 1,
          alpha: 1,
          color: `hsl(${Math.random() * 360}, 100%, 60%)`,
        }));
      }
      update() {
        this.particles.forEach(p => {
          p.x += Math.cos(p.angle) * p.speed;
          p.y += Math.sin(p.angle) * p.speed;
          p.alpha -= 0.02;
        });
      }
      draw() {
        this.particles.forEach(p => {
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.globalAlpha = 1;
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      fireworks.forEach((f, i) => {
        f.update();
        f.draw();
        if (f.particles.every(p => p.alpha <= 0)) fireworks.splice(i, 1);
      });
      requestAnimationFrame(animate);
    };

    animate();

    const launch = () => {
      fireworks.push(new Firework(
        Math.random() * canvas.width,
        Math.random() * canvas.height * 0.6
      ));
    };

    const interval = setInterval(launch, 700);
    return () => clearInterval(interval);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" />;
}

export default function NewYearSurprise() {
  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center text-white overflow-hidden">
      <FireworksCanvas />

      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="relative z-10 text-center max-w-2xl p-10 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl"
      >
        <motion.h1
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-5xl font-bold mb-6"
        >
          🎆 Happy New Year Akshu 🎆
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-xl mb-8 leading-relaxed"
        >
          My Dear Akshu 💖<br />
          As the fireworks light up the sky, I hope your life lights up even brighter this year.
          May every dream you carry find its way to reality, every smile stay longer,
          and every moment feel warm, magical, and truly yours ✨
          <br /><br />
          Thank you for being you — kind, beautiful, and unforgettable.
          Here’s to a year filled with love, laughter, and endless happiness 🌸
        </motion.p>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.4, type: "spring", stiffness: 120 }}
          className="flex justify-center mb-6"
        >
          <Heart className="text-pink-400 w-16 h-16 animate-pulse" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <Button className="bg-pink-500 hover:bg-pink-600 text-lg px-8 py-6 rounded-full shadow-xl">
            💫 A Year As Beautiful As You 💫
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
