import React from 'react'
import { useTranslation } from 'react-i18next'
import { NL, GB } from 'country-flag-icons/react/1x1'

import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'

import styles from './LanguageBar.module.css'
import { languages } from '../i18n'

const LanguageBar = () => {
  const { t, i18n } = useTranslation('languagebar');

  return (
    <Box sx={{
      zIndex: 2,
      position: 'relative',
      bgcolor: 'primary.dark',
      color: 'white',
    }}>
      <Container>
        <Stack direction="row" justifyContent="end" pt={0.5} pb={0.5}>
          {languages.map((lang: string, i: number) => 
            <Button 
              key={lang} 
              size="small" 
              startIcon={
                lang === 'en' ? <GB className={styles.flag} /> :
                lang === 'nl' ? <NL className={styles.flag} /> :
                ''
              }
              sx={{mr: i === languages.length - 1 ? 0 : 2, color: '#fff'}}
              onClick={() => {
                if (i18n.language !== lang) {
                  i18n.changeLanguage(lang)
                } 
              }}
            >
              {t(lang)}
            </Button>
          )}
        </Stack>
      </Container>
    </Box>
  )
}

export default LanguageBar;