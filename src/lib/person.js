import { useState, useEffect } from 'react';

export async function fetchPerson(cookie = '') {
  if (typeof window !== 'undefined' && window.__person) {
    return window.__person;
  }

  const res = await fetch(
    '/api/me',
    cookie
    ? {
      headers: {
        cookie,
      },
    }
    : {}
  )

  if (!res.ok) {
    delete window.__person;
    return null;
  }

  const json = await res.json();
  if (typeof window !== 'undefined') {
    window.__person = json;
  }

  return json;
}

export function useFetchPerson({ required } = {}) {
  const [loading, setLoading] = useState(
    () => !(typeof window !== 'undefined' && window.__person)
  );

  const [person, setPerson] = useState(() => {
    if (typeof window === 'undefined') {
      return null;
    }

    return window.__person || null;
  });

  useEffect(
    () => {
      if (!loading && person) {
        return;
      }

      setLoading(true);

      let isMounted = true;

      fetchPerson().then((person) => {
        // Only set the person if the component is still mounted
        if (isMounted) {
          // When the person is not logged in but login is required
          if (required && !person) {
            window.location.href = '/api/login';
            return;
          }


          setPerson(person);
          setLoading(false);
        }
      });

      return () => {
        isMounted = false
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return { person, loading }
}
