// ======================================================
// REVEAL COMPONENT
// ======================================================

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";


// ======================================================
// PROPS
// ======================================================

type RevealProps = {

  // Isi yang ingin diberi animasi
  children: ReactNode;

};


// ======================================================
// COMPONENT
// ======================================================

export function Reveal({
  children,
}: RevealProps) {


  // ====================================================
  // REF
  // ====================================================
  //
  // useRef digunakan untuk mendapatkan akses
  // ke element HTML.
  // ====================================================

  const elementRef =
    useRef<HTMLDivElement | null>(null);


  // ====================================================
  // STATE
  // ====================================================
  //
  // visible = apakah element sudah masuk viewport?
  // ====================================================

  const [visible, setVisible] =
    useState(false);


  // ====================================================
  // INTERSECTION OBSERVER
  // ====================================================

  useEffect(() => {

    const element =
      elementRef.current;


    // Jika element belum tersedia,
    // hentikan proses.

    if (!element) {
      return;
    }


    // Membuat observer

    const observer =
      new IntersectionObserver(
        ([entry]) => {

          // Kalau element terlihat,
          // ubah visible menjadi true.

          if (entry.isIntersecting) {

            setVisible(true);

            // Sudah terlihat.
            // Tidak perlu diamati lagi.

            observer.unobserve(element);

          }

        },
        {
          // Animasi mulai ketika
          // sekitar 15% element terlihat.

          threshold: 0.15,
        }
      );


    // Mulai mengamati element

    observer.observe(element);


    // Cleanup ketika component dihancurkan

    return () => {

      observer.disconnect();

    };

  }, []);


  // ====================================================
  // RETURN
  // ====================================================

  return (

    <div
      ref={elementRef}
      className={
        visible
          ? "reveal reveal-visible"
          : "reveal"
      }
    >

      {children}

    </div>

  );

}